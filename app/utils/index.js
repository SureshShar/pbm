export function camelToTitle(str) {
  return str
    .replace(/([A-Z])/g, " $1") // add space before capital letters
    .replace(/^./, (char) => char.toUpperCase()) // capitalize first letter
    .toLowerCase()
    .replaceAll("_", " ") // make all lowercase
    .replace(/^\w/, (c) => c.toUpperCase()); // capitalize first word
}

// This generator will be used to create a unique user ID
// consisting of 4 alphanumeric characters.
export function getUserId(type = "simple", length = 4) {
  const charsComplex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const charsSimple = "abcdefghijklmnpqrstuvwxyz123456789";
  const chars = type === "complex" ? charsComplex : charsSimple;

  return [...Array(length)].map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// This generator will be used to create a 4 digit password
export function getPassword() {
  return [...Array(4)]
    .map(() => "123456789"[Math.floor(Math.random() * 4)])
    .join("");
}

export function getValidation(type) {
  switch (type) {
    case "email":
      return function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      };

    case "phone":
      return function (value) {
        // Accepts 10–15 digits (customize as needed)
        const phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(value);
      };

    case "text":
      return function (value) {
        // At least 4 non-whitespace characters
        return value.trim().length > 3;
      };

    case "password":
      return function (value) {
        // At least 4 characters, including letters and numbers
        return value.trim().length > 3;
      };

    default:
      return function () {
        return false; // unknown validation type
      };
  }
}

export function scrollToId(id, offset = 70) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
  }
}

export function getChangedValues(oldObj, newObj) {
  if (!oldObj || !newObj) return {};

  return Object.fromEntries(
    Object.keys(newObj)
      .filter((k) => oldObj[k] !== newObj[k])
      .map((k) => [k, newObj[k]]),
  );
}

export function setUserPageInstaneData(response, setInstanceData) {
  setInstanceData("userMetaData", {
    email_id: response.data.email_id,
    contact_number: response.data.contact_number,
    // telegram_id: response.data.telegram_id,
    user_available: response.data.user_available,
    page_layout: response.data.page_layout,
    extraPageData: response.data.page_data?.extra,
  });
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // convert 0 → 12

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[date.getMonth()];

  return `${hours}:${minutes} ${ampm}, ${day}/${monthName}/${year}`;
}

// export function debounce(func, delay = 5000) {
//   let timer;
//   return function(...args) {
//     const context = this;
//     // Clear any existing timer to reset the 5-second countdown
//     clearTimeout(timer); 
//     // Start a new 5-second timer
//     timer = setTimeout(() => {
//       func.apply(context, args);
//     }, delay);
//   };
// }

// This function converts a schema with items as an object containing keys and values arrays 
// to a schema with items as an array of objects.
export function toSchema25(data) {
  const clone = structuredClone(data);

  clone.schemaVersion = "2.5";

  traverse(clone, (block) => {
    if (block.items?.keys && block.items?.values) {
      const { keys, values } = block.items;

      block.items = values.map(row => {
        const obj = {};
        keys.forEach((k, i) => {
          obj[k] = row[i];
        });
        return obj;
      });
    }
  });

  return clone;
}

// This function converts a schema with items as an array of objects 
// to a schema with items as an object containing keys and values arrays.
export function toSchema3(data) {
  const clone = structuredClone(data);

  clone.schemaVersion = "3.0";

  traverse(clone, (block) => {
    if (Array.isArray(block.items)) {
      const keys = Object.keys(block.items[0] || {});
      const values = block.items.map(item =>
        keys.map(k => item[k])
      );

      block.items = { keys, values };
    }
  });

  return clone;
}
