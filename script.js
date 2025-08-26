// DOM Elements
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const addCardBtn = document.getElementById("addCard");
const randomizeBtn = document.getElementById("randomize");
const flashcardContainer = document.getElementById("flashcardContainer");
const closeAllCardsBtn = document.getElementById("closeAllCards");
const deleteAllCardsBtn = document.getElementById("deleteAllCards");

// Utility Functions
function showNotification(message) {
  // Hapus notifikasi sebelumnya jika ada
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  // Hilangkan notifikasi setelah 3 detik
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function createFlashcard(question, answer) {
  const flashcard = document.createElement("div");
  flashcard.classList.add("flashcard");

  const flashcardInner = document.createElement("div");
  flashcardInner.classList.add("flashcard-inner");

  const flashcardFront = document.createElement("div");
  flashcardFront.classList.add("flashcard-front");
  flashcardFront.textContent = question;

  const flashcardBack = document.createElement("div");
  flashcardBack.classList.add("flashcard-back");
  flashcardBack.textContent = answer;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    flashcard.remove();
  });

  flashcardInner.appendChild(flashcardFront);
  flashcardInner.appendChild(flashcardBack);
  flashcard.appendChild(deleteBtn);
  flashcard.appendChild(flashcardInner);

  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });

  flashcardContainer.appendChild(flashcard);
}

// Card Management Functions
function addPresetCards(category) {
  const data = presetData[category];
  if (!data) return;

  let addedCount = 0;
  for (let i = 0; i < data.questions.length; i++) {
    createFlashcard(data.questions[i], data.answers[i]);
    addedCount++;
  }

  showNotification(
    `${addedCount} kartu ${categoryNames[category]} berhasil ditambahkan!`
  );
}

function addRowCards(rowId) {
  const data = rowData[rowId];
  if (!data) return;

  let addedCount = 0;
  for (let i = 0; i < data.questions.length; i++) {
    createFlashcard(data.questions[i], data.answers[i]);
    addedCount++;
  }

  showNotification(
    `${addedCount} kartu ${rowNames[rowId]} berhasil ditambahkan!`
  );
}

function addCustomCards() {
  const questionsText = questionInput.value.trim();
  const answersText = answerInput.value.trim();

  if (!questionsText || !answersText) {
    alert("Soal dan jawaban tidak boleh kosong!");
    return;
  }

  // Pisahkan string input menjadi array berdasarkan koma
  const questions = questionsText.split(",");
  const answers = answersText.split(",");

  // Validasi: Periksa apakah jumlah soal dan jawaban sama
  if (questions.length !== answers.length) {
    alert(
      `Error: Jumlah soal (${questions.length}) tidak sama dengan jumlah jawaban (${answers.length})!`
    );
    return;
  }

  // Loop untuk membuat kartu sebanyak input yang ada
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i].trim();
    const answer = answers[i].trim();

    // Pastikan item yang sudah di-split tidak kosong
    if (question && answer) {
      createFlashcard(question, answer);
    }
  }

  // Kosongkan input setelah semua kartu ditambahkan
  questionInput.value = "";
  answerInput.value = "";
  questionInput.focus();
}

function randomizeCards() {
  const cards = Array.from(flashcardContainer.children);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  flashcardContainer.innerHTML = "";
  cards.forEach((card) => flashcardContainer.appendChild(card));
}

function closeAllCards() {
  const openCards = document.querySelectorAll(".flashcard.flipped");
  openCards.forEach((card) => {
    card.classList.remove("flipped");
  });
}

function deleteAllCards() {
  if (flashcardContainer.children.length === 0) {
    alert("Tidak ada kartu untuk dihapus!");
    return;
  }

  const confirmDelete = confirm(
    `Apakah Anda yakin ingin menghapus semua ${flashcardContainer.children.length} kartu flashcard?`
  );

  if (confirmDelete) {
    flashcardContainer.innerHTML = "";
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Main action buttons
  addCardBtn.addEventListener("click", addCustomCards);
  randomizeBtn.addEventListener("click", randomizeCards);
  closeAllCardsBtn.addEventListener("click", closeAllCards);
  deleteAllCardsBtn.addEventListener("click", deleteAllCards);

  // Preset buttons
  document.getElementById("hiraganaBasic").addEventListener("click", () => {
    addPresetCards("hiraganaBasic");
  });

  document.getElementById("hiraganaTenten").addEventListener("click", () => {
    addPresetCards("hiraganaTenten");
  });

  document
    .getElementById("hiraganaHandakuten")
    .addEventListener("click", () => {
      addPresetCards("hiraganaHandakuten");
    });

  document.getElementById("hiraganaYoon").addEventListener("click", () => {
    addPresetCards("hiraganaYoon");
  });

  document.getElementById("katakanaBasic").addEventListener("click", () => {
    addPresetCards("katakanaBasic");
  });

  document.getElementById("katakanaTenten").addEventListener("click", () => {
    addPresetCards("katakanaTenten");
  });

  document
    .getElementById("katakanaHandakuten")
    .addEventListener("click", () => {
      addPresetCards("katakanaHandakuten");
    });

  document.getElementById("katakanaYoon").addEventListener("click", () => {
    addPresetCards("katakanaYoon");
  });

  document.getElementById("addAllHiragana").addEventListener("click", () => {
    addPresetCards("hiraganaBasic");
    addPresetCards("hiraganaTenten");
    addPresetCards("hiraganaHandakuten");
    addPresetCards("hiraganaYoon");
  });

  document.getElementById("addAllKatakana").addEventListener("click", () => {
    addPresetCards("katakanaBasic");
    addPresetCards("katakanaTenten");
    addPresetCards("katakanaHandakuten");
    addPresetCards("katakanaYoon");
  });

  // Hiragana row buttons
  document.getElementById("hiragana-a").addEventListener("click", () => {
    addRowCards("hiragana-a");
  });
  document.getElementById("hiragana-ka").addEventListener("click", () => {
    addRowCards("hiragana-ka");
  });
  document.getElementById("hiragana-sa").addEventListener("click", () => {
    addRowCards("hiragana-sa");
  });
  document.getElementById("hiragana-ta").addEventListener("click", () => {
    addRowCards("hiragana-ta");
  });
  document.getElementById("hiragana-na").addEventListener("click", () => {
    addRowCards("hiragana-na");
  });
  document.getElementById("hiragana-ha").addEventListener("click", () => {
    addRowCards("hiragana-ha");
  });
  document.getElementById("hiragana-ma").addEventListener("click", () => {
    addRowCards("hiragana-ma");
  });
  document.getElementById("hiragana-ya").addEventListener("click", () => {
    addRowCards("hiragana-ya");
  });
  document.getElementById("hiragana-ra").addEventListener("click", () => {
    addRowCards("hiragana-ra");
  });
  document.getElementById("hiragana-wa").addEventListener("click", () => {
    addRowCards("hiragana-wa");
  });

  // Katakana row buttons
  document.getElementById("katakana-a").addEventListener("click", () => {
    addRowCards("katakana-a");
  });
  document.getElementById("katakana-ka").addEventListener("click", () => {
    addRowCards("katakana-ka");
  });
  document.getElementById("katakana-sa").addEventListener("click", () => {
    addRowCards("katakana-sa");
  });
  document.getElementById("katakana-ta").addEventListener("click", () => {
    addRowCards("katakana-ta");
  });
  document.getElementById("katakana-na").addEventListener("click", () => {
    addRowCards("katakana-na");
  });
  document.getElementById("katakana-ha").addEventListener("click", () => {
    addRowCards("katakana-ha");
  });
  document.getElementById("katakana-ma").addEventListener("click", () => {
    addRowCards("katakana-ma");
  });
  document.getElementById("katakana-ya").addEventListener("click", () => {
    addRowCards("katakana-ya");
  });
  document.getElementById("katakana-ra").addEventListener("click", () => {
    addRowCards("katakana-ra");
  });
  document.getElementById("katakana-wa").addEventListener("click", () => {
    addRowCards("katakana-wa");
  });

  // Tenten & Handakuten row buttons
  document.getElementById("hiragana-ga").addEventListener("click", () => {
    addRowCards("hiragana-ga");
  });
  document.getElementById("hiragana-za").addEventListener("click", () => {
    addRowCards("hiragana-za");
  });
  document.getElementById("hiragana-da").addEventListener("click", () => {
    addRowCards("hiragana-da");
  });
  document.getElementById("hiragana-ba").addEventListener("click", () => {
    addRowCards("hiragana-ba");
  });
  document.getElementById("hiragana-pa").addEventListener("click", () => {
    addRowCards("hiragana-pa");
  });
  document.getElementById("katakana-ga").addEventListener("click", () => {
    addRowCards("katakana-ga");
  });
  document.getElementById("katakana-za").addEventListener("click", () => {
    addRowCards("katakana-za");
  });
  document.getElementById("katakana-da").addEventListener("click", () => {
    addRowCards("katakana-da");
  });
  document.getElementById("katakana-ba").addEventListener("click", () => {
    addRowCards("katakana-ba");
  });
  document.getElementById("katakana-pa").addEventListener("click", () => {
    addRowCards("katakana-pa");
  });
}

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
});
