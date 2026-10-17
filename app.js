const fruits = [
{ name: "apple", symbol: "🍎
" },
{ name: "banana", symbol: "🍌
" },
{ name: "cherry", symbol: "🍒
" },
{ name: "coconut", symbol: "🥥
" },
{ name: "grapes", symbol: "🍇
" },
{ name: "mango", symbol: "🥭
" },
{ name: "pineapple", symbol: "🍍
" },
{ name: "watermelon", symbol: "🍉
" },
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffle([...fruits, ...fruits])

