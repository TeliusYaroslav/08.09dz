window.addEventListener('beforeunload', function (event) {
    const message = 'Останьтесь еще на минутку посмотреть на параграф';
    event.preventDefault(); 
    event.returnValue = ''; 
});