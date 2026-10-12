function loadComponent(elementId, fileUrl) {
    fetch(fileUrl)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
}

// Load components when the page opens
window.onload = function() {
    loadComponent('headerBar', 'header.html');
    loadComponent('sidebar', 'sidebar.html');
    loadComponent('footerBar', 'footer.html');
};