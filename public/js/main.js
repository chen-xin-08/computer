const keyBoardLists = [
    {
        type: 'command',
        value: 'clear',
        label: 'C',
    },
    {
        type: 'command',
        value: 'toggle-minus',
        label: '+/-',
    },
    {
        type: 'command',
        value: 'percentage',
        label: '%',
    },
    {
        type: 'operation',
        value: 'division',
        label: '÷',
    },
    {
        type: 'number',
        value: '7',
        label: '7',
    },
    {
        type: 'number',
        value: '8',
        label: '8',
    },
    {
        type: 'number',
        value: '9',
        label: '9',
    },
    {
        type: 'operation',
        value: 'multpie',
        label: '×',
    },
    {
        type: 'number',
        value: '4',
        label: '4',
    },
    {
        type: 'number',
        value: '5',
        label: '5',
    },
    {
        type: 'number',
        value: '6',
        label: '6',
    },
    {
        type: 'operation',
        value: 'minus',
        label: '-',
    },
    {
        type: 'number',
        value: '1',
        label: '1',
    },
    {
        type: 'number',
        value: '2',
        label: '2',
    },
    {
        type: 'number',
        value: '3',
        label: '3',
    },
    {
        type: 'operation',
        value: 'plus',
        label: '+',
    },
    {
        type: 'number',
        value: '0',
        label: '0',
    },
    {
        type: 'command',
        value: '.',
        label: '.',
    },
    {
        type: 'command',
        value: 'equal',
        label: '=',
    },
]


const keyBoardElement = document.querySelector("#keyboard-area")
let lastNumber = 0
let operationNumber = 0
let lastOperation = ""
let isLastOperation = false


function buildKeyboard() {
    keyBoardLists.forEach(item => {
        const element = document.createElement('div');
        element.dataset.type = item.type
        element.dataset.value = item.value
        element.classList.add('key')
        element.classList.add(item.value)
        element.textContent = item.label
        element.addEventListener("click", clickKey)
        keyBoardElement.appendChild(element)
    })
}
buildKeyboard()
function clickKey(e) {
    const dataSet = e.target.dataset
    switch (dataSet.type) {
        case 'command': handlerCommand(dataSet.value);
            break;
        case 'operation': handlerOperation(dataSet.value);
            break;
        case 'number': handlerNumber(dataSet.value);
            break;
        default: throw new Error("当前类型不存在！")
    }
}

const resultElement = document.querySelector("#result")
function handlerCommand(value) {
    if (value === 'clear') {
        // resultElement.textContent = '0'
        clear()
    } else
        if (value === 'toggle-minus') {
            resultElement.textContent = - Number.parseFloat(resultElement.textContent)
        } else
            if (value === 'percentage') {
                resultElement.textContent = Number.parseFloat(resultElement.textContent) / 100
            } else
                if (value === '.') {
                    resultElement.textContent.indexOf('.') !== -1 || (resultElement.textContent += '.')
                } else
                    if (value === 'equal') {

                    } else {
                        throw new Error('命令不存在！')
                    }

}
function handlerNumber(value) {
    if (resultElement.textContent === '0' || isLastOperation) {
        resultElement.textContent = value
        isLastOperation = false
    } else {
        resultElement.textContent += value
    }
    operationNumber = Number.parseFloat(resultElement.textContent)
}
function handlerOperation(value) {
    console.log(value);
    if (lastNumber !== 0 && operationNumber !== 0) {
        calculate()
    }
    lastNumber = Number.parseFloat(resultElement.textContent)
    lastOperation = value
    isLastOperation = true

}

function calculate() {
    let result = ''
    console.log(lastOperation);
    switch (lastOperation) {
        case 'plus': result = lastNumber + operationNumber;
            break;
        case 'minus': result = lastNumber - operationNumber;
            break;
        case 'multiple': result = lastNumber * operationNumber;
            break;
        case 'division': result = lastNumber / operationNumber;
            break;
        default: throw new Error('操作不存在')
    }

    resultElement.textContent = result;
    lastNumber = result
}


function clear() {
    resultElement.textContent = '0';
    lastNumber = 0
    operationNumber = 0
    lastOperation = ""
    isLastOperation = false
}


