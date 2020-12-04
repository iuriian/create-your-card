const title = 'Olá, crie seu cartão!'
let i = 0;

const writeTitle = () => {
    let currentTitle = $('.title');
    let newTitle = '';

    setTimeout(() => {
        newTitle = currentTitle.text().concat(title.substr(i, 1));
        currentTitle.text(newTitle);
        i++;
        
        if (i < title.length) {
            writeTitle()
        }
    }, 200);
}

const fillName = () => {
    let name = '';
    
    $('#fullname').click(() => {
        $('.flip-card .card-wrapper').css('transform', 'rotateY(0deg)');
    });

    $('#fullname').on('keyup', (ev) => {
        if (name.length < 19) {
            $('.fullname').text(ev.target.value.toUpperCase());
        }
    })

}

const formatDate = (date) => {
    return date.split('/')[1] + '/' + date.split('/')[2].substr(2, 2);
}

const fillDate = () => {
    const today = new Date();
    const validateMax = new Date(new Date().setFullYear(today.getFullYear() + 5)).toLocaleDateString();

    $('#valid-at').val(formatDate(validateMax));
    $('#member-at').val(formatDate(today.toLocaleDateString()));

    $('.filled-valid-at').text(formatDate(validateMax));
    $('.filled-member-since').text(formatDate(today.toLocaleDateString()));
}

const fillCardNumber = () => {
    let cardNumber = '';
    let justNumbers = '';

    $('#card-number').click(() => {
        $('.flip-card .card-wrapper').css('transform', 'rotateY(180deg)');
    });

    $('#card-number').attr('maxlength', 19);
    $('#card-number').on('keyup', (ev) => {
        cardNumber = ev.target.value;
        justNumbers = cardNumber.replace(/\D/g, '');

        if (ev.key !== 'Backspace' && justNumbers.length % 4 == 0 && cardNumber.length < 19) {
            cardNumber = cardNumber.concat(' ');
        }

        cardNumber.split(' ').forEach((value, key) => {
            $('.group-numbers .filled-card-number')
                    .eq(key)
                    .text(value.padEnd(4, 'X'));
        });


        $('#card-number').val(cardNumber);
    });
}

const fillCvv = () => {
    let currentCvv = '';
    let justNumbers = '';
    $('.filled-cvv').text('XXX');

    $('#cvv').click(() => {
        $('.flip-card .card-wrapper').css('transform', 'rotateY(180deg)');
    });

    $('#cvv').on('keyup', (ev) => {
        currentCvv = ev.target.value;
        justNumbers = currentCvv.replace(/\D/g, '');

        $('#cvv').val(justNumbers);

        $('.filled-cvv').text(currentCvv.padEnd(3, 'X'));
    });
}

$(document).ready(function () {

    writeTitle();
    fillName();
    fillDate();
    fillCardNumber();
    fillCvv();

});