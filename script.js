// Get DOM elements
const quoteInput = document.getElementById('quoteInput');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const quotesList = document.getElementById('quotesList');
const emptyState = document.getElementById('emptyState');
const quotesTitle = document.getElementById('quotesTitle');

// Initialize quotes array from localStorage
let quotes = loadQuotesFromStorage();

// Load quotes from localStorage
function loadQuotesFromStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        try {
            return JSON.parse(storedQuotes);
        } catch (error) {
            console.error('Error parsing quotes from localStorage:', error);
            return [];
        }
    }
    return [];
}

// Save quotes to localStorage
function saveQuotesToStorage() {
    try {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    } catch (error) {
        console.error('Error saving quotes to localStorage:', error);
        alert('Error saving quote. Please try again.');
    }
}

// Render all quotes
function renderQuotes() {
    quotesList.innerHTML = '';
    
    if (quotes.length === 0) {
        emptyState.classList.remove('hidden');
        quotesTitle.textContent = 'Your Saved Quotes';
    } else {
        emptyState.classList.add('hidden');
        quotesTitle.textContent = `Your Saved Quotes (${quotes.length})`;
        
        quotes.forEach((quote, index) => {
            const quoteItem = createQuoteElement(quote, index);
            quotesList.appendChild(quoteItem);
        });
    }
}

// Create a quote element
function createQuoteElement(quote, index) {
    const quoteItem = document.createElement('div');
    quoteItem.className = 'quote-item';
    
    const quoteText = document.createElement('div');
    quoteText.className = 'quote-text';
    quoteText.textContent = quote;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.addEventListener('click', () => deleteQuote(index));
    
    quoteItem.appendChild(quoteText);
    quoteItem.appendChild(deleteBtn);
    
    return quoteItem;
}

// Add a new quote
function addQuote() {
    const quoteText = quoteInput.value.trim();
    
    if (quoteText === '') {
        alert('Please enter a quote before adding!');
        return;
    }
    
    quotes.push(quoteText);
    saveQuotesToStorage();
    renderQuotes();
    
    // Clear input field
    quoteInput.value = '';
    quoteInput.focus();
}

// Delete a quote
function deleteQuote(index) {
    if (confirm('Are you sure you want to delete this quote?')) {
        quotes.splice(index, 1);
        saveQuotesToStorage();
        renderQuotes();
    }
}

// Event listeners
addQuoteBtn.addEventListener('click', addQuote);

quoteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addQuote();
    }
});

// Initial render
renderQuotes();

