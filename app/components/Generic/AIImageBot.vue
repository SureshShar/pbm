<template>
  <div class="relative mx-2 md:mx-auto">
    <!-- Chat history -->
    <div ref="chatContainer" class="p-2 lg:p-8 md:w-9/12 mx-auto">
      <div v-for="(msg, idx) in messages.slice(-6)" :key="idx" class="mb-2">
        <div v-if="msg.role === 'user'" class="text-right capitalize">
          <span
            class="inline-block bg-primary text-bglight px-3 p-1 md:p-3 rounded-md mb-1 mt-2"
          >
            {{ msg.content }}
          </span>
        </div>
        <div v-else class="w-full">
          <span
            v-if="msg.typing"
            class="inline-block w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-bglight px-3 p-1 md:p-3 rounded-md"
            v-html="renderMarkdown(msg.content)"
          ></span>
          <GenericCollapsableText
            v-else
            :paragraph="msg.content"
            :renderMarkdown="renderMarkdown"
          />
        </div>
      </div>
      <div v-if="loading" class="mt-2 text-primary h-7 mb-5">Thinking...</div>
    </div>

    <!-- Input box below chat -->
    <div class="relative mx-auto w-full md:w-10/12 mt-3">
      <!-- <div
        class="bg-gradient-to-tr from-pink-800 to-blue-700 p-0.5 shadow-lg"
      > -->
      <GenericTextAreaInput
        v-model="userInput"
        name="message"
        :rows="2"
        placeholder="Ask about Me..."
        label=""
        @keyup.enter="sendMessage"
      />
      <button
        class="px-1 md:px-2 md:py-2 rounded-full text-tdv-dark_primary absolute right-0 bottom-2 md:bottom-0"
        @click="sendMessage"
        :disabled="loading || !userInput.trim()"
      >
        <SvgIconsCompleteArrow
          class="w-7 h-7 md:w-10 md:h-10 text-primary dark:text-bglight"
        />
      </button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
const modelValue = defineModel("modelValue");

const userInput = ref("");
const messages = ref([]);
const loading = ref(false);
const renderMarkdown = ref((val) => val);
const chatContainer = ref(null);
let typingTimer = null;

const route = useRoute();
const { setLocalData, getLocalData } = useLocalStorage();

// Build system prompt from all trainingData fields
function getSystemPrompt(td) {
  const content = `You are ${td.userName || "an AI assistant"}, a ${
    td.category || ""
  }, 
    age ${td.age || ""}, located in ${td.location || ""}.
    Your hobbies: ${td.hobby || ""}, Likes: ${td.likes || ""},
    Dislikes: ${td.dislikes || ""}, Skills: ${td.skill || ""}, Goals: ${
    td.goals || ""
  }.
    Respond in a ${td.tone || "friendly"} tone.
    Always respond as this person, keeping answers short and helpful. Stay within your expertise and avoid unrelated topics.
  `;
  return { role: "system", content };
}

async function sendMessage() {
  if (!userInput.value.trim()) return;
  loading.value = true;

  messages.value.push({
    role: "user",
    content: userInput.value,
  });

  await nextTick();
  scrollToBottom();
  const systemPrompt = getSystemPrompt(modelValue.value);

  const userQuery = [
    systemPrompt,
    ...messages.value
      .slice(-5)
      .map((m) => ({ role: m.role, content: m.content })),
  ];

  try {
    const response = await useApi("aiAssistant", {
      data: getDirty({ userQuery }),
    });
    const fullText = response?.data || "Sorry, I couldn't find an answer.";
    // Push placeholder and type out the response
    messages.value.push({ role: "assistant", content: "", typing: true });
    await nextTick();
    typeOut(fullText);
  } catch (err) {
    messages.value.push({
      role: "assistant",
      content: "Sorry, something went wrong.",
    });
  }
  userInput.value = "";
  loading.value = false;
  setLocalData(`aiAssistant_${route.params.userId}`, messages.value.slice(-5));
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

function typeOut(text) {
  let i = 0;
  if (typingTimer) clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    const lastIdx = messages.value.length - 1;
    if (lastIdx < 0) return clearInterval(typingTimer);
    if (i >= text.length) {
      messages.value[lastIdx].typing = false;
      clearInterval(typingTimer);
      setLocalData(`aiAssistant_${route.params.userId}`, messages.value.slice(-5));
      return;
    }
    messages.value[lastIdx].content += text[i++];
    scrollToBottom();
  }, 15);
}

// Load chat history from localStorage
onMounted(async () => {
  const { marked } = await import("marked");
  renderMarkdown.value = marked.parse;

  const saved = getLocalData(`aiAssistant_${route.params.userId}`);
  if (saved) {
    messages.value = saved;
    await nextTick();
    scrollToBottom();
  }
});
</script>
