const STORAGE_KEY = "frontend_data_2.0";
const TWELVE_HOURS = 12 * 60 * 60 * 1000
let localStorageSetTimer;

// Encripted local storage for client data
export function useLocalStorage() {
  const state = useState("local-data", () => ({}));

  // Only for local data
  function setLocalData(key, value) {
    state.value[key] = value;

    if (import.meta.client) {
      if (localStorageSetTimer) clearTimeout(localStorageSetTimer);

      localStorageSetTimer = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value));
      }, 2000);
    }
  }
  // Get data from local storage
  function getLocalData(key) {
    return state.value[key];
  }
  // Get all data from local storage
  function getAllLocalData() {
    return state.value;
  }
  // Initialize local data
  // function initializeAllLocalData() {
  //   if (import.meta.client) {
  //     const saved = localStorage.getItem(STORAGE_KEY);
  //     state.value = saved ? JSON.parse(saved) : {};
  //   }
  // }
function initializeAllLocalData() {
  if (!import.meta.client) return

  const saved = localStorage.getItem(STORAGE_KEY)
  const now = Date.now()

  let data = saved ? JSON.parse(saved) : {}

  // If no timestamp, add one
  if (!data._ts) {
    data._ts = now
    state.value = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return
  }

  // If timestamp expired
  if (now - data._ts > TWELVE_HOURS) {
    const allowedKeys = [
      "pageId",
      "selectedImageCategory",
      "authId",
      "superAdminAuthToken"
    ]

    const cleanedData = { _ts: now }

    allowedKeys.forEach((key) => {
      if (key in data) {
        cleanedData[key] = data[key]
      }
    })

    state.value = cleanedData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedData))
    return
  }

  // Normal initialization
  state.value = data
}

  // ****** Only instance data ********
  const instance = useState("instance", () => ({}));

  // Only for page Instance
  function getInstanceData(key) {
    return instance.value[key];
  }
  // Only for page Instance means data lost on page refresh
  // No local storage used
  function setInstanceData(key, value) {
    instance.value[key] = value;
  }

  // ****** Only alert instance data ********
  const alerts = useState("alerts", () => []);

  // Type: 'success', 'error', 'warning' etc
  function showAlert(type, message, time = 5) {
    const newAlert = {
      id: Date.now(),
      type,
      message,
    };
    alerts.value.push(newAlert);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeAlert(newAlert.id);
    }, time * 1000);
  }
  function removeAlert(id) {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }
  function showSuccess(message, time) {
    showAlert("success", message, time);
  }
  function showError(message, time) {
    showAlert("error", message, time);
  }
  function showWarning(message, time) {
    showAlert("warning", message, time);
  }

  return {
    setLocalData,
    getLocalData,
    getInstanceData,
    setInstanceData,
    getAllLocalData,

    // Function for alert
    alerts,
    showAlert,
    removeAlert,
    showSuccess,
    showError,
    showWarning,

    // Code initilisation mainly for browser base storage
    initializeAllLocalData,
  };
}

/**
 * // Necessory to update data in database
 * editMode -> Activate edit mode show submit instead of pencil icon (boolean)
 * isUserChangedPageData -> User changed page data (boolean), Confirm change for unnecessory database update (boolean).
 *
 * // Help in user cart and history data management according to user Id
 * cartItems_<user-Id> -> Items according to user Id
 * cartHistory_<user-Id> -> History according to user Id
 * aiAssistant_<user-Id> -> AI assistant chat history (array of chats)
 *
 * // Help in user cart form after refresh they remain filled
 * userName -> User name (string) from user cart form
 * userContact -> User contact (string) from user cart form
 * userMail -> User mail (string) from user cart form   **NOT_IN_USE**
 * alert -> null or { type: 'success' | 'error' | 'warning', message: string } for showing alert after user action
 *
 * // Few user data to share globally in the user instance
 * uploadedImageUrls -> Uploaded image urls for showing in user asset section and image selector
 * userMetaData -> {
 *   email_id: ,
 *   contact_number: ,
 *   telegram_id: , // No need now
 *   user_available: ,
 *   page_layout: ,
 *   extraPageData:  // Extra page data from admin
 * }
 *
 * // Help in showing image from same category as selected in past
 * selectedImageCategory -> Selected image category for image selector
 *
 * // Help in user login and update data after refresh on super-admin page
 * superAdminAuthToken -> Super admin authentication TOKEN state (boolean)
 *
 * // Help in user login again after refresh on admin page
 * pageId -> Page id or url (string),
 * authId -> Authentication id for data update validation
 *
 */
