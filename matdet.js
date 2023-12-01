let crnt_n = 0;

        function display(n){
            let solvebtn = document.getElementById('solve');
            solvebtn.disabled = true;

            let parent = document.getElementById('eqs');
            
            while (parent.hasChildNodes()) {
                parent.removeChild(parent.firstChild);
            }

            let firstrow = document.createElement('div');
            firstrow.className = "row eq";
            firstrow.style = 'margin-bottom: 30px;';
            let nvalue = document.createElement('div');
            nvalue.className = "col text-center";
            let heading = document.createElement('h3');
            heading.innerHTML = 'For ' + n + ' X ' + n + ' matrix.';
            nvalue.appendChild(heading);
            firstrow.appendChild(nvalue);
            parent.appendChild(firstrow);


            let indicator = document.createElement('div');
            indicator.className = "row eq";
            let srno = document.createElement('div');
                srno.className = "col text-center";
                indicator.appendChild(srno);

            for(let i = 0 ; i < n ; i++){
                let newvar = document.createElement('div');
                newvar.className = "col text-center";
                newvar.innerHTML = 'C<sub>' + i + '</sub>';
                indicator.appendChild(newvar);
            }


            parent.appendChild(indicator);

            for(let i = 1 ; i <= n ; i++){
                let newdiv = document.createElement('div');
                newdiv.className = "row eq";
                parent.appendChild(newdiv);

                let newchild = document.createElement('div');
                newchild.className = 'col text-center';
                newchild.innerHTML = 'R<sub>' + i + '</sub>';
                newdiv.appendChild(newchild);
                for(let j = 0 ; j < n ; j++){
                    let newcol = document.createElement('div');
                    newcol.className = 'col text-center';
                    let newinput = document.createElement('input');
                    newinput.type = 'number';
                    newinput.value = 0;
                    newinput.className = 'form-control';
                    newinput.addEventListener("mouseover",function ()
                    {
                        if(newdiv.style.color != "red"){
                            newdiv.style.color = "blue";
                        }

                        for(let k = 0 ; k < newdiv.childElementCount ; k++){
                            if(newdiv.childNodes[k] == newcol){
                                if(indicator.childNodes[k].style.color != "red")
                                    indicator.childNodes[k].style.color = "blue";
                                break;
                            }
                        }
                    });
                    newinput.addEventListener("mouseout",function ()
                    {
                        if(newdiv.style.color == "blue"){
                            newdiv.style.color = "aliceblue";
                        }

                        for(let k = 0 ; k < newdiv.childElementCount ; k++){
                            if(newdiv.childNodes[k] == newcol){
                                if(indicator.childNodes[k].style.color == "blue")
                                    indicator.childNodes[k].style.color = "aliceblue";
                                break;
                            }
                        }
                    });
                    newinput.addEventListener("focus",function ()
                    {
                        newdiv.style.color = "red";
                        for(let k = 0 ; k < newdiv.childElementCount ; k++){
                            if(newdiv.childNodes[k] == newcol){
                                indicator.childNodes[k].style.color = "red";
                                break;
                            }
                        }
                    });
                    newinput.addEventListener("blur",function ()
                    {
                        newdiv.style.color = "aliceblue";
                        for(let k = 0 ; k < newdiv.childElementCount ; k++){
                            if(newdiv.childNodes[k] == newcol){
                                indicator.childNodes[k].style.color = "aliceblue";
                                break;
                            }
                        }
                    });
                    newcol.appendChild(newinput);
                    newdiv.appendChild(newcol);
                }
            }

            crnt_n = n;
            solvebtn.disabled = false;
            

        }


function takeinput(n){
    // window.alert('value of n is ' + n);
    let arr = [];
    for(let i = 0 ; i < n ; i++){
        arr[i] = [];
    }
    let inpts = document.querySelectorAll('input');
    console.log(inpts);
    
    for(let j = 0 ; j < inpts.length ; j++){
        let val = parseFloat(inpts[j].value);
        console.log(val);
        console.log(typeof(val));
        let x = Math.floor(j/(n));
        let y = Math.floor(j%(n));
        console.log(x);
        console.log(y);
        arr[x][y] = val;
    }
    
    console.log(arr);
    let ans = finddet(arr,n);
    console.log(ans);
    let str;
    if(ans == undefined)
        str = 'Dimensions cannot be less than 1.';
    else
        str = 'The determinant of the given matrix is ' + ans;

    let parent = document.getElementById('eqs');
    let newrow = document.createElement('div');
    newrow.className = 'row eq';
    newrow.style = 'margin-top: 20px;';
    let newcol = document.createElement('div');
    newcol.className = 'col text-center';
    newcol.innerHTML = str;
    newrow.appendChild(newcol);
    parent.appendChild(newrow);

}


function finddet(arr,n){
    if(n < 1)
        return undefined;
    if(n == 1){
        return arr[0][0];
    }

    let subarr = [];
    for(let i = 0 ; i < n-1 ; i++){
        subarr[i] = [];
    }

    let swapcheck = 1;
    if(arr[0][0] == 0){
        let i = 0;
        while(i < n){
            if(arr[i][0] != 0)
                break;
            i++;
        }
        if(i == n)
            return 0;

        for(let j = 0 ; j < n ; j++){
            let temp = arr[i][j];
            arr[i][j] = arr[0][j];
            arr[0][j] = temp;
        }
        swapcheck = -1;
    }

    let mul = [];
    let div = [];
    for(let i = 1 ; i < n ; i++){
        let cnt = 0;
        for(let j = 1 ; j < n ; j++){
            if(arr[i][0] == 0){
                subarr[i-1][j-1] = arr[i][j];
                continue;
            }
            cnt++;
            subarr[i-1][j-1] = (arr[i][j]/arr[i][0])*arr[0][0] - arr[0][j];
        }
        if(cnt){
            mul.push(arr[i][0]);
            div.push(arr[0][0]);
        }
    }

    
    let x = finddet(subarr,n-1);

    console.log(subarr);
    console.log(mul);
    console.log(div);

    for(let i = 0 ; i < mul.length ; i++)
        x *= mul[i];
    for(let i = 0 ; i < div.length ; i++)
        x /= div[i];
    x *= swapcheck;

    console.log(x);

    return (x*arr[0][0]);

}