document.addEventListener('DOMContentLoaded', function () {
    var exportBoardButton = document.getElementById('exportBoard');
    exportBoardButton.textContent = 'Export board to text';

    exportBoardButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true }, function (tabs) {
            var tab = tabs[0];
            var getBoardInfoQuery = "(function () { \
                const boardTitle = document.querySelector('.board-name')?.textContent?.trim();\
                if (!boardTitle) { \
                    throw 'Board title does not exist. Please check if provided URL is correct.';\
                }\
                let parsedText = `${boardTitle}\\n\\n`;\
                const columns = document.querySelectorAll('.message-list'); \
                columns.forEach((column) => { \
                    const columnTitle = column.querySelector('.column-header h2').textContent.trim(); \
                    const messages = [...column.querySelectorAll('.message-main')].map(messageBody => { \
                        const messageText = messageBody.querySelector('.message-body .text').textContent.trim(); \
                        const votes = messageBody.querySelector('.votes .vote-area span.show-vote-count').textContent.trim(); \
                        return `- ${messageText} (${votes})`; });\
                        parsedText = `${parsedText}${columnTitle}\\n${messages.join('\\n')}\\n\\n`; });\
                        return parsedText;\
                    })()";

            chrome.tabs.executeScript(tab.id, {
                code: getBoardInfoQuery
            }, displayExportedText);

            resizeWindow();

        });
    }, false);

}, false);

function displayExportedText(results) {
    if (results[0]) {
        copyToClipboard(results);
        document.querySelector("#exportedText").innerHTML = results;
        document.getElementById('exportBoard').textContent = 'Retry';
        showPopupText();
    } else {
        let alert = document.getElementById('errorAlert');
        var closeAlert = alert.firstElementChild;
        closeAlert.addEventListener('click', function () {
            alert.classList.remove('show');
        });
        alert.classList.add('show');
    }
}

function resizeWindow() {
    let mainContainer = document.getElementById('mainContainer');
    mainContainer.style["width"] = "600px";
    mainContainer.style["max-width"] = "100%";
}

function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function showPopupText() {
    var popup = document.getElementById("copiedPopup");
    popup.classList.add("show");
    setTimeout(function () {
        popup.classList.remove('show');
    }, 5000);
}