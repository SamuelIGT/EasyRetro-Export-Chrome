let boardTitle = document.querySelector('#board-name').textContent.trim();
if (!boardTitle) {
    throw 'Board title does not exist. Please check if provided URL is correct.'
}
let parsedText = boardTitle + '\n\n';
let columns = document.querySelectorAll('.message-list');
columns.forEach((column) => {
    const columnTitle = column.querySelector('.column-header h2').textContent.trim();
    const messages = [...column.querySelectorAll('.message-main')].map(messageBody => {
        const messageText = messageBody.querySelector('.message-body .text').textContent.trim();
        const votes = messageBody.querySelector('.votes .vote-area span.show-vote-count').textContent.trim();
        return `- ${messageText} (${votes})`;
    });
    parsedText = parsedText + columnTitle + '\n' + messages.join('\n') + '\n\n';
});
console.log(parsedText);