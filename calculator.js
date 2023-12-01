let sequence = [];
        let crntlinecharcnt = 0;

        function append(btn){
            sequence.push(btn);
            // let para = document.getElementById('input').innerHTML;
            // para += btn;
            document.getElementById('input').innerHTML = sequence.join(' ');
        }
        
        function clearbtn(){
            // document.getElementById('input').innerHTML = 'hello?';
            if(sequence.length == 0)
            return;
        
            let x = sequence.pop();
            let para = document.getElementById('input').innerHTML;
            // console.log(typeof(x));
            // console.log(typeof(para));
            // console.log(x.length);
            // console.log(para.length);
            para = para.slice(0 , para.length - x.length - 1);
            document.getElementById('input').innerHTML = para;
            
        }

        function clearall(){
            // window.alert(sequence.join(""));
            document.getElementById('input').innerHTML = '';
            sequence.splice(0,sequence.length);
            location.replace("index.html");
        }



// let x = Math.PI;

function transform(sequence){
    let newseq = [];
    let i = 0;
    while(i < sequence.length){
        switch(sequence[i]){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                let j = i+1, cnt = 0;
                if(sequence[i] == '.')
                    cnt++;

                while(j < sequence.length && (sequence[j] == '.' || sequence[j] == '0' || sequence[j] == '1' || sequence[j] == '2' || sequence[j] == '3' || sequence[j] == '4' || sequence[j] == '5' || sequence[j] == '6' || sequence[j] == '7' || sequence[j] == '8' || sequence[j] == '9'))
                {
                    if(sequence[j] == '.')
                        cnt++;
                    sequence[i] += sequence[j];
                    sequence.splice(j,1);
                }
                if(cnt > 1){
                    window.alert('Invalid expression. 2 or more decimal points in a number.');
                    clearall();
                    return;
                }
                sequence[i] = parseFloat(sequence[i]);
                break;
            

        }
        i++;
    }
    return sequence;

}

function calculate(sequence){

    sequence = transform(sequence);
    console.log(sequence);
    // return;

    let exprshn = sequence.join(' ');
    // exprshn = exprshn.replace(/Pi/g,3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679);
    // exprshn = exprshn.replace(/e/g,2.7182818284590452353602874713526624977572);
    // sequence = exprshn.split(" ");

    console.log(exprshn);
    let i = 0 , cnt = 0;
    for(i;i<sequence.length;i++){
        if(sequence[i] == 'Pi'){
            sequence[i] = Math.PI;
        }
        if(sequence[i] == 'e'){
            sequence[i] = Math.E;
        }
        // if(i>0){
        //     if(typeof(sequence[i]) == 'number' && typeof(sequence[i-1]) == 'number'){
        //         sequence[i-1] = sequence[i-1]*10 + sequence[i];
        //         sequence.splice(i,1);
        //     }
        // }
        if(sequence[i] == '(' || sequence[i] == 'log(' || sequence[i] == 'ln(' || sequence[i] == 'sin(' || sequence[i] == 'cos(' || sequence[i] == 'tan('){
            cnt++;
        }
        if(sequence[i] == ')'){
            cnt--;
        }
        console.log(sequence[i]);
        console.log(typeof(sequence[i]));
    }

    if(cnt){
        window.alert('Invalid expression');
        clearall();
        return;
    }

    for( i = 0 ; i < sequence.length ; i++ ){
        if(sequence[i] == '.'){
            if(typeof(sequence[i-1]) != 'number'){
                window.alert('Invalid Input');
                clearall();
                return;

            }
            else{
                if(sequence[i-1]%1 != 0){
                    window.alert('Invalid Input');
                    clearall();
                    return;

                }
                else{
                    if(typeof(sequence[i+1]) != 'number'){
                        window.alert('Invalid Input');
                        clearall();
                        return;

                    }
                    else{
                        if(sequence[i+1]%1 != 0){
                            window.alert('Invalid Input');
                            clearall();
                            return;

                        }
                        else{
                            let n = Math.floor(Math.log10(sequence[i+1])) + 1;
                            sequence[i-1] += sequence[i+1]/Math.pow(10,n);
                            sequence.splice(i,2);
                            i--;
                            console.log(sequence[i]);
                            console.log(typeof(sequence[i]));
                        }
                    }
                }
            }
        }
        if(sequence[i] == '-' && typeof(sequence[i-1]) != 'number' && typeof(sequence[i+1]) == 'number'){
            sequence[i+1] = 0 - sequence[i+1];
            sequence.splice(i,1);
            console.log(sequence[i]);
            console.log(typeof(sequence[i]));
            i--;

        }
        if(typeof(sequence[i]) == 'number' && typeof(sequence[i-1]) == 'number'){
            sequence[i-1] *= sequence[i];
            sequence.splice(i,1);
            console.log(sequence[i]);
            console.log(typeof(sequence[i]));
            i--;
        }
    }
    console.log(sequence);
    let final_ans = evaluate(sequence);
    document.getElementById('ans').innerHTML = final_ans;
}

function evaluate(sequence){
    console.log(sequence);
    for(let i = 0 ; i < sequence.length ; i++){
        console.log(sequence[i]);
        if(sequence[i] == '('){
            let temp = [];
            let cnt = 1, j = i+1;
            while(cnt){
                if(sequence[j] == '(' || sequence[j] == 'log(' || sequence[j] == 'ln(' || sequence[j] == 'sin(' || sequence[j] == 'cos(' || sequence[j] == 'tan('){
                    cnt++;
                    temp.push(sequence[j]);
                }
                else if(sequence[j] == ')'){
                    cnt--;
                    if(cnt)
                        temp.push(sequence[j]);

                }
                else
                {
                    temp.push(sequence[j]);
                }
                j++;
            }
            console.log(temp);
            let val = evaluate(temp);
            let ans = val;
            sequence.splice(i,j-i,ans);
        }
        if(sequence[i] == 'sin('){
            let temp = [];
            let cnt = 1, j = i+1;
            while(cnt){
                if(sequence[j] == '(' || sequence[j] == 'log(' || sequence[j] == 'ln(' || sequence[j] == 'sin(' || sequence[j] == 'cos(' || sequence[j] == 'tan('){
                    cnt++;
                    temp.push(sequence[j]);
                }
                else if(sequence[j] == ')'){
                    cnt--;
                    if(cnt)
                        temp.push(sequence[j]);

                }
                else
                {
                    temp.push(sequence[j]);
                }
                j++;
            }
            console.log(temp);
            let val = evaluate(temp);
            let ans = Math.sin(val);
            sequence.splice(i,j-i,ans);
        }
        if(sequence[i] == 'cos('){
            let temp = [];
            let cnt = 1, j = i+1;
            while(cnt){
                if(sequence[j] == '(' || sequence[j] == 'log(' || sequence[j] == 'ln(' || sequence[j] == 'sin(' || sequence[j] == 'cos(' || sequence[j] == 'tan('){
                    cnt++;
                    temp.push(sequence[j]);
                }
                else if(sequence[j] == ')'){
                    cnt--;
                    if(cnt)
                        temp.push(sequence[j]);

                }
                else
                {
                    temp.push(sequence[j]);
                }
                j++;
            }
            console.log(temp);
            let val = evaluate(temp);
            let ans = Math.cos(val);
            sequence.splice(i,j-i,ans);
        }
        if(sequence[i] == 'tan('){
            let temp = [];
            let cnt = 1, j = i+1;
            while(cnt){
                if(sequence[j] == '(' || sequence[j] == 'log(' || sequence[j] == 'ln(' || sequence[j] == 'sin(' || sequence[j] == 'cos(' || sequence[j] == 'tan('){
                    cnt++;
                    temp.push(sequence[j]);
                }
                else if(sequence[j] == ')'){
                    cnt--;
                    if(cnt)
                        temp.push(sequence[j]);

                }
                else
                {
                    temp.push(sequence[j]);
                }
                j++;
            }
            console.log(temp);
            let val = evaluate(temp);
            let ans = Math.tan(val);
            sequence.splice(i,j-i,ans);
        }
        if(sequence[i] == 'log('){
            let temp = [];
            let cnt = 1, j = i+1;
            while(cnt){
                if(sequence[j] == '(' || sequence[j] == 'log(' || sequence[j] == 'ln(' || sequence[j] == 'sin(' || sequence[j] == 'cos(' || sequence[j] == 'tan('){
                    cnt++;
                    temp.push(sequence[j]);
                }
                else if(sequence[j] == ')'){
                    cnt--;
                    if(cnt)
                        temp.push(sequence[j]);

                }
                else
                {
                    temp.push(sequence[j]);
                }
                j++;
            }
            console.log(temp);
            let val = evaluate(temp);
            let ans = Math.log10(val);
            sequence.splice(i,j-i,ans);
        }
        if(sequence[i] == 'ln('){
            let temp = [];
            let cnt = 1, j = i+1;
            while(cnt){
                if(sequence[j] == '(' || sequence[j] == 'log(' || sequence[j] == 'ln(' || sequence[j] == 'sin(' || sequence[j] == 'cos(' || sequence[j] == 'tan('){
                    cnt++;
                    temp.push(sequence[j]);
                }
                else if(sequence[j] == ')'){
                    cnt--;
                    if(cnt)
                        temp.push(sequence[j]);

                }
                else
                {
                    temp.push(sequence[j]);
                }
                j++;
            }
            console.log(temp);
            let val = evaluate(temp);
            let ans = Math.log(val);
            sequence.splice(i,j-i,ans);
        }
    }
    console.log(sequence);
    let stack;
    let ind = 0 , rank = 0;
    if(sequence.length == 1){
        if(typeof(sequence[0]) != 'number'){
            window.alert('Invalid expression');
            clearall();
            return;

        }
        else{
            if(Math.abs(sequence[0]) < Math.pow(10,-15))
            sequence[0] = 0;
            console.log(sequence[0]);
            return sequence[0];
        }
    }
    for(let i = 0 ; i < sequence.length ; i++){
        if(typeof(sequence[i]) == 'number' && typeof(sequence[i-1]) == 'number'){
            sequence[i-1] *= sequence[i];
            sequence.splice(i,1);
            console.log(sequence[i]);
            console.log(typeof(sequence[i]));
            i--;
        }
        
    }
    for(let i = 0 ; i < sequence.length ; i++){

        if(typeof(sequence[i]) == 'number'){
            rank++;
        }
        else{
            rank--;
        }
    }
    console.log(sequence);
    console.log(rank);
    if(rank != 1){
        window.alert('Invalid expression');
        clearall();
        return;

    }
    for(let i = sequence.length-1 ; i > 0 ; i--){
        if(sequence[i] == '^'){
            sequence[i-1] = Math.pow(sequence[i-1],sequence[i+1]);
            sequence.splice(i,2);
        }
    }
    for(let i = 0 ; i < sequence.length ; i++){
        if(sequence[i] == '/'){
            sequence[i-1] /= sequence[i+1];
            sequence.splice(i,2);
        }
        if(sequence[i] == 'x'){
            sequence[i-1] *= sequence[i+1];
            sequence.splice(i,2);
        }
    }
    for(let i = 0 ; i < sequence.length ; i++){
        if(sequence[i] == '+'){
            sequence[i-1] += sequence[i+1];
            sequence.splice(i,2);
        }
        if(sequence[i] == '-'){
            sequence[i-1] -= sequence[i+1];
            sequence.splice(i,2);
        }
    }
    if(sequence.length != 1){
        window.alert('Invalid expression');
        clearall();
        return;
    }
    if(typeof(sequence[0]) != 'number'){
        window.alert('Invalid expression');
        clearall();
        return;
    }
    if(Math.abs(sequence[0] - Math.floor(sequence[0])) < Math.pow(10,-15))
        sequence[0] = Math.floor(sequence[0]);

    if(Math.abs(sequence[0] - Math.ceil(sequence[0])) < Math.pow(10,-15))
        sequence[0] = Math.ceil(sequence[0]);

    console.log(sequence[0]);
    return sequence[0];

    // while(ind != sequence.length){
    //     let num = sequence[ind].
    // }
}