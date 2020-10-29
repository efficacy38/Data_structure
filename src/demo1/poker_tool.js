const pokerToInt = (stringInput) =>{
    let ret = stringInput
    .trim()
    .split(",")
    .map((data) => (data.toUpperCase()))
    .map((data) => {
        let base = 0;
        console.log(data[1])

        switch(data[0]){
            case 'S':
                base += 39;
                break;
            case 'H':
                base += 26;
                break;
            case 'D':
                 base += 13;
                break;
            case 'C':
            default:
                console.log('it seems has some bug.')
                break;
        }

        switch(data[1])
        {
            case 'J':
                base += 9;
                break;
            case 'Q':
                base += 10;
                break;
            case 'K':
                base += 11;
                break;
            case 'A':
                base += 12;
                break;
            default:
                base += (parseInt(data.substring(1)) - 2);
                break;
        }

        return base;
    });
    return ret;
}

const intToPoker = (pokerNum) => {
    let poker = "";
    switch(Math.floor(pokerNum / 13))
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
        default:
            break;
    }
    
    switch(pokerNum % 13)
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
            poker += (Math.floor(pokerNum % 13) + 2).toString();
        break;
    }
    return poker;
}

export {intToPoker, pokerToInt}