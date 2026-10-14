const input = document.getElementById('textInput');
const form = document.getElementById('palindromeForm');
const button = document.getElementById('checkButton');
const clearButton = document.getElementById('clearButton');
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');

const previousChecks = [];

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isPalindrome(value) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return false;
  }

  return normalized === [...normalized].reverse().join('');
}

function renderHistory() {
  if (previousChecks.length === 0) {
    historyList.innerHTML = '<li class="empty-state">No checks yet.</li>';
    return;
  }

  historyList.innerHTML = previousChecks
    .map(
      (item) => `
        <li>
          <strong>${item.word}</strong>
          <span>${item.message}</span>
          <span class="status ${item.isPalindrome ? 'palindrome' : 'not-palindrome'}">
            ${item.isPalindrome ? 'Palindrome' : 'Not a palindrome'}
          </span>
        </li>
      `
    )
    .join('');
}

function checkWord() {
  const value = input.value.trim();

  if (!value) {
    result.textContent = 'Please enter a word or phrase to check.';
    result.className = 'error';
    return;
  }

  const palindrome = isPalindrome(value);
  const message = palindrome
    ? `"${value}" is a palindrome.`
    : `"${value}" is not a palindrome.`;

  result.textContent = message;
  result.className = palindrome ? 'success' : 'error';

  previousChecks.unshift({
    word: value,
    message: message,
    isPalindrome: palindrome,
  });

  renderHistory();
  form.reset();
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  checkWord();
});

clearButton.addEventListener('click', () => {
  previousChecks.length = 0;
  renderHistory();
  result.textContent = 'History cleared. Waiting for input...';
  result.className = '';
  form.reset();
  input.focus();
});

renderHistory();
