const denOutput = document.querySelector('.den span.value');
const binOutput = document.querySelector('.bin span.value');
const hexOutput = document.querySelector('.hex span.value');
const inputElement = document.querySelector('input');


document.querySelectorAll('.drop-down>span').forEach(button => {
    button.onclick = function() {
        let input = inputElement.value;
        if (input != '')
            if (button.innerHTML == 'DEN') {
                if (!(/[\W]/.test(input) || /[a-zA-Z]/.test(input))) {
                    denOutput.innerHTML = input;
                    binOutput.innerHTML = formatBinaryNumber(get_binary_from_denary(input));
                    hexOutput.innerHTML = get_hex_from_binary(get_binary_from_denary(input));
                }
            } else if (button.innerHTML == 'BIN') {
            if (!(/[\W]/.test(input) || /[a-zA-Z]/.test(input) || /[23456789]/.test(input))) {
                binOutput.innerHTML = formatBinaryNumber(get_binary_from_denary(get_denary_from_binary(input)));
                denOutput.innerHTML = get_denary_from_binary(input);
                hexOutput.innerHTML = get_hex_from_binary(get_binary_from_denary(get_denary_from_binary(input)));
            }
        } else if (button.innerHTML == 'HEX') {
            if (!(/[\W]/.test(input) || /[g-zG-Z]/.test(input))) {
                hexOutput.innerHTML = input;
                binOutput.innerHTML = formatBinaryNumber(get_binary_from_hex(input));
                denOutput.innerHTML = get_denary_from_binary(get_binary_from_hex(input))
            }
        }
    }
})

const hex = '0123456789ABCDEF';
const binBase = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'];
const den = '0123456789'

function get_binary_from_denary(v) {

    try {
        v = JSON.parse(v);
    } catch {
        console.error('Your number format was incorrect')
    }

    let bin = '';

    while (v != 0) {
        bin += v % 2;
        v = Math.floor(v / 2)
    }

    bin = bin.split('').reverse().join('');

    if (!(bin.length % 4 == 0)) {

        let l = bin.length > 4 ? 4 - (bin.length % 4) : 4 - bin.length;

        let i = 0;


        while (i < l) {
            let bin2 = bin.split('')
            bin2.unshift('0')
            bin = bin2.join('')
            i++;
        }
    }


    return bin == '' ? '0000' : bin;
}

function get_binary_from_hex(v) {
    let s = v.split('');
    s = s.map((ch) => {
        return binBase[hex.split('').indexOf(ch.toUpperCase())];
    })

    let binary_result = s.join('');

    return binary_result;


}

function get_denary_from_hex(hex) {
    let binary_number = get_8bit_binary_from_hex(hex);
    return get_denary_from_binary(binary_number);
}

function get_denary_from_binary(binaryNumber) {
    let carry = 0;
    binaryNumber = binaryNumber.split('').reverse().join('');
    binaryNumber.split('').forEach((ch, i) => {
        if (ch == 1) {
            carry = carry + Math.pow(2, i);
        }
    })

    return carry;
}

function get_hex_from_binary(binary_number) {
    let nibbles = binary_number.match(/.{1,4}/g);
    let hexadeciamlRes = '';
    nibbles.forEach((nibble, i) => {
        hexadeciamlRes += hex[binBase.indexOf(nibble)];
    });

    return hexadeciamlRes;
}

function formatBinaryNumber(b) {
    let f = b.match(/.{1,4}/g);

    let s = '';

    f.forEach(bi => {
        s += bi + ' ';
    })

    return s;
}

function formatDenaryNumber(n) {
    let f = n.match(/.{1,3}/g),
        s = f.join(',')

    return s;
}