const pokerToInt = (stringInput) =>{
    let ret = stringInput
    .trim()
    .split(",")
    .map((data) => (data.toUpperCase()))
    .map((data) => {
        let base;
        console.log(data[1])
        switch(data[1])
        {
            case 'J':
                base = 36;
                break;
            case 'Q':
                base = 40;
                break;
            case 'K':
                base = 44;
                break;
            case 'A':
                base = 48;
                break;
            default:
                base = (parseInt(data.substring(1)) - 2) * 4;
                break;
        }
        switch(data[0]){
            case 'S':
                return 3 + base;
                break;
            case 'H':
                return 2 + base;
                break;
            case 'D':
                return 1 + base;
                break;
            case 'C':
                return base;
                break;
        }
    });
    return ret;
}

const intToPoker = (pokerNum) => {
    let poker = "";
    switch(pokerNum % 4)
    {
        case 0:
            poker = 'C';
            break;
        case 1:
            poker = 'D';
            break;
        case 2:
            poker = 'H';
            break;
        case 3:
            poker = 'S';
            break;
    }
    
    switch(Math.floor(pokerNum / 4))
    {
        case 9:
            poker += 'J';
            break;
        case 10:
            poker += 'Q';
            break;
        case 11:
            poker += 'K';
            break;
        case 12:
            poker += 'A';
            break;
        default:
            poker += (Math.floor(pokerNum / 4) + 2).toString();
        break;
    }
    return poker;
}

export {intToPoker, pokerToInt}