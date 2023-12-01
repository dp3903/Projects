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
            heading.innerHTML = 'For ' + n + ' equations in ' + n + ' variables.';
            nvalue.appendChild(heading);
            firstrow.appendChild(nvalue);
            parent.appendChild(firstrow);


            let indicator = document.createElement('div');
            indicator.className = "row eq";
            let srno = document.createElement('div');
                srno.className = "col text-center";
                srno.innerHTML = 'Eq no.';
                srno.style = 'padding-top: 20px;';
                indicator.appendChild(srno);

            for(let i = 0 ; i < n ; i++){
                let newvar = document.createElement('div');
                newvar.className = "col text-center";
                newvar.innerHTML = 'a<sub>' + i + '</sub>';
                indicator.appendChild(newvar);
            }

            let rhsconst = document.createElement('div');
                rhsconst.className = "col text-center";
                rhsconst.innerHTML = 'Constant term in RHS.<br>( . . . = C )';
                indicator.appendChild(rhsconst);

            parent.appendChild(indicator);

            for(let i = 1 ; i <= n ; i++){
                let newdiv = document.createElement('div');
                newdiv.className = "row eq";
                parent.appendChild(newdiv);

                let newchild = document.createElement('div');
                newchild.className = 'col text-center';
                newchild.innerHTML = i;
                newdiv.appendChild(newchild);
                for(let j = 0 ; j <= n ; j++){
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
        let x = Math.floor(j/(n+1));
        let y = Math.floor(j%(n+1));
        console.log(x);
        console.log(y);
        arr[x][y] = val;
    }
    
    console.log(arr);
    let ans = verify(arr,n,n+1);
    console.log(ans);
    let str;
    if(ans == undefined)
        str = 'The given equations do not have any unique solution.';
    else
        str = 'The solution to your given equations is ' + ans;

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



function verify(arr,n,m){
    if(typeof(arr) != 'object'){
        window.alert('The passed item is not an object.');
        return undefined;
        // reload the page or issue a warning.
    }
    if(typeof(n) != 'number'){
        window.alert('N is not a number.');
        return undefined;
    }
    if(typeof(m) != 'number'){
        window.alert('M is not a number.');
        return undefined;
    }
    if(n%1 != 0){
        window.alert('N is not an integer.');
        return undefined;
    }
    if(m%1 != 0){
        window.alert('M is not an integer.');
        return undefined;
    }
    if(n != m-1){
        window.alert('Dimensions of equations do not match.');
        return undefined;
    }
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < m ; j++){
            if(typeof(arr[i][j]) != 'number'){
                window.alert('In the equation no. ' + (i+1) + ', the ' + (j+1) + 'th variable is not a number.');
                return undefined;
            }
        }
    }
    let ans = calc(arr,n,m);
    return ans;
}



function calc(arr,n,m){
    if(n < 1)
        return;
    if(n == 1){
        let ans = [];
        if(arr[0][0] == 0)
            return undefined;

        ans[0] = (arr[0][1]/arr[0][0]);

        return ans;
    }
    let subarr = [];
    for(let i = 0 ; i < n ; i++)
        subarr[i] = [];

    for(let i = 0 ; i < n-1 ; i++){
        for(let j = 1 ; j < m ; j++){
            subarr[i][j-1] = (arr[i][j]*arr[i+1][0] - arr[i+1][j]*arr[i][0]);
        }
    }

    console.log(subarr);

    let ans = calc(subarr,n-1,m-1);
    if(ans == undefined)
        return undefined;

    console.log(ans);

    let crntvar = arr[0][m-1];

    for(let i = 0 ; i < m-2 ; i++){

        crntvar -= (ans[i]*arr[0][i+1]);
    }
    if(arr[0][0] == 0)
        return undefined;

    crntvar /= arr[0][0];

    ans = [crntvar,...ans];

    return ans;

}