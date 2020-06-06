window.onload=function() {
    var xmlhttp = null;

    function sendXmlhttp(type, url, data, callback) {
        xmlhttp = new XMLHttpRequest() || new window.ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open(type, url, true);
        xmlhttp.send(data);
        xmlhttp.onreadystatechange = function () { // Use onreadystatechange instead onload.
            if (this.status === 200 && this.readyState === 4) {
                callback(this.response);
            }
        };
    }

    sendXmlhttp("GET", "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", null, function (response) {
        var getEmpObj = JSON.parse(response);
        //printing employeesData to console to chek if the data is fetched
        //console.log(employeesData)
        displayEmployee(getEmpObj); //calling a function to process employee data by passing object as an argument
    });
    function displayEmployee(employeesData){
        var employeesObj=Object.values(employeesData);
        //console.log(employeesObj);
        employeesObj.forEach(employeeObj =>{

            //STEP-1: CREATE A DIV ELEMENT AND DO STYLING
            var divElement =document.createElement('div');
            divElement.setAttribute('class','displaybox');


            //STEP-2:  CREATE A IMAGE TAG AND DISPLAY CROWN IF EMPLOYEE IS FEATURED
            if(employeeObj.employeeisfeatured == 1){

                var featuredImagelement = document.createElement('img');
                featuredImagelement.setAttribute('src','images/crown-emoji.png');
                featuredImagelement.setAttribute('class','crown-emoji');
                divElement.appendChild(featuredImagelement);
            }


            //STEP-3: CREATE A IMAGE TAG AND DISPLAY EMPLOYEE PICTURE AND FETCH DATA FROM OBJECT
            var imageElement = document.createElement('img');
            imageElement.setAttribute("src", "http://sandbox.bittsdevelopment.com/code1/employeepics/"+employeeObj.employeeid+".jpg");
            imageElement.setAttribute("class", "img-employee");
            divElement.appendChild(imageElement);

            //STEP-4: CREATE A HEADING ELEMENT TO DISPLAY EMPLOYEE NAME AND FETCH DATA FROM OBJECT
            var headingElement = document.createElement('h2');
            var EmpFname=employeeObj.employeefname;
            var EmpLname=employeeObj.employeelname;
            var empFullName= EmpFname.concat(" ",EmpLname);
            empFullName=document.createTextNode(empFullName);
            headingElement.appendChild(empFullName);
            divElement.appendChild(headingElement);

            //STEP-5: CREATE PARAGRAPH TAG TO STORE BIO AND FETCH THE DATA FROM OBJECT
            var paragraphElement = document.createElement('p');
            var bio= document.createTextNode(employeeObj.employeebio);
            paragraphElement.appendChild(bio);
            divElement.appendChild(paragraphElement);


            //STEP-6 : FETCH EMPLOYEE ROLES FROM NESTED OBJECT AND DISPLAY
            var employeeRole = Object.values(employeeObj.roles);
            employeeRole.forEach(employeeRole =>{
                let role = document.createElement('span');
                var empRole = document.createTextNode(employeeRole.rolename);
                role.className ="emprole";
                role.style.backgroundColor = employeeRole.rolecolor;
                role.style.padding="4px";
                role.style.marginRight="10px";
                role.style.marginLeft="10px";
                role.appendChild(empRole);
                var spanElement = document.createElement('span');
                spanElement.appendChild(role);
                divElement.appendChild(spanElement);
            })
            document.getElementById("employee_details").appendChild(divElement);
        });
    }

}

