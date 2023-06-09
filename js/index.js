let add_btn = document.getElementById("add-btn");
let update_btn = document.getElementById("update-btn");
let delete_btn = document.getElementById("delete-btn");
let clear_btn = document.getElementById("clear-btn");
let search_inp = document.getElementById("search-inp");
let contact_list = document.getElementById("contact-list");
let select_all = document.getElementById("select-all");

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let pnum = document.getElementById("pnum");
let email = document.getElementById("email");

let delete_list = [];
let updateIndex = 0;

document.getElementById("add-popup-btn").addEventListener("click", () => { showPopup("add") });

add_btn.addEventListener("click", () => {
    if (validateData(fname.value, lname.value, pnum.value, email.value)) {
        let html = `
        <tr id="contact-row-${getContactList().length}">
        <td>
        <div class="center"><input type="checkbox" id="contact-check-${getContactList().length}"></div>
        </td>
        <td>${fname.value + " " + lname.value}</td>
        <td>${pnum.value}</td>
        <td>${email.value}</td>
        <td>
        <button type="button" onclick="editContact(${getContactList().length})">
        <i class="fa-solid fa-pen-to-square"style="color: #0000FF;"></i>
        </button>
        </td>
        <td>
        <button type="button" onclick="deleteContact(${getContactList().length})">
        <i class="fa-solid fa-trash"style="color: #FF0000;"></i>
        </button>
        </td>
        </tr>
        `;

        contact_list.innerHTML += html;

        setContactList(getContactList().concat([{ fname: fname.value, lname: lname.value, pnum: pnum.value, email: email.value }]));
        select_all.checked = false;
        hidePopup();
    }
});

search_inp.addEventListener("keyup", searchContacts);

clear_btn.addEventListener("click", () => {
    search_inp.value = "";
    searchContacts();
});

function searchContacts() {
    let contactList = getContactList();
    let search_val = search_inp.value.toLowerCase();

    if (search_val == "") {
        clear_btn.style.display = "none";
    }
    else {
        clear_btn.style.display = "block";
    }

    for (const index in contactList) {
        if (contactList[index].fname.toLowerCase().includes(search_val) ||
            contactList[index].lname.toLowerCase().includes(search_val) ||
            contactList[index].pnum.toLowerCase().includes(search_val) ||
            contactList[index].email.toLowerCase().includes(search_val)) {
            document.getElementById("contact-row-" + index).style.display = "table-row";
        }
        else {
            document.getElementById("contact-row-" + index).style.display = "none";
        }
    }
}

delete_btn.addEventListener("click", () => {
    deleteContacts();
});

update_btn.addEventListener("click", () => {
    if (validateData(fname.value, lname.value, pnum.value, email.value)) {
        let contactList = getContactList();

        contactList[updateIndex].fname = fname.value;
        contactList[updateIndex].lname = lname.value;
        contactList[updateIndex].pnum = pnum.value;
        contactList[updateIndex].email = email.value;

        setContactList(contactList);
        hidePopup();
        showContactList();
    }
});

select_all.addEventListener("change", () => {
    let contactList = getContactList();
    let flag = true;

    if (!select_all.checked) {
        flag = false;
    }

    for (const index in contactList) {
        document.getElementById("contact-check-" + index).checked = flag;
    }
});

showContactList();
function showContactList() {
    select_all.checked = false;
    let html = "";
    let contactList = getContactList();
    for (const index in contactList) {
        html += `
            <tr id="contact-row-${index}">
                <td>
                    <div class="center"><input type="checkbox" id="contact-check-${index}"></div>
                </td>
                <td>${contactList[index].fname + ' ' + contactList[index].lname}</td>
                <td>${contactList[index].pnum}</td>
                <td>${contactList[index].email}</td>
                <td>
                    <button type="button" onclick="editContact(${index})">
                        <i class="fa-solid fa-pen-to-square"style="color: #0000FF;"></i>
                    </button>
                </td>
                <td>
                    <button type="button" onclick="deleteContact(${index})">
                        <i class="fa-solid fa-trash"style="color: #FF0000;"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    contact_list.innerHTML = html;
}

function deleteContact(index) {
    let contactList = getContactList();
    contactList.splice(index, 1);
    setContactList(contactList);
    showContactList();
}

function deleteContacts() {
    let contactList = getContactList();
    for (let index = contactList.length - 1; index >= 0; index--) {
        if (document.getElementById("contact-check-" + index).checked) {
            contactList.splice(index, 1);
        }
    }

    setContactList(contactList);
    showContactList();
}

function editContact(index) {
    let contactList = getContactList();
    showPopup("edit");
    fname.value = contactList[index].fname;
    lname.value = contactList[index].lname;
    pnum.value = contactList[index].pnum;
    email.value = contactList[index].email;
    updateIndex = index;
}

function validateData(fname, lname, pnum, email) {
    let flag = true;

    if (fname.length < 2) {
        document.getElementById("err-fname").innerHTML = "First Name must be 2 characters long"; 
        flag = false;
    }
    else if (!/^[a-zA-Z]+$/.test(fname)) {
        document.getElementById("err-fname").innerHTML = "First Name must be contains only letters";
        flag = false;
    }
    else {
        document.getElementById("err-fname").innerHTML = "";
    }

    if (lname.length < 2) {
        document.getElementById("err-lname").innerHTML = "Last Name must be 2 characters long"; 
        flag = false;
    }
    else if (!/^[a-zA-Z]+$/.test(lname)) {
        document.getElementById("err-lname").innerHTML = "Last Name must be contains only letters";
        flag = false;
    }
    else {
        document.getElementById("err-lname").innerHTML = "";
    }

    if (pnum.length != 10) {
        document.getElementById("err-pnum").innerHTML = "Phone Number length must be equal to 10 digits";
        flag = false;
    }
    else if (!/^\d*$/.test(pnum)) {
        document.getElementById("err-pnum").innerHTML = "Phone Number should contains only Number";
        flag = false;
    }
    else {
        document.getElementById("err-pnum").innerHTML = "";
    }

    if (email == "") {
        document.getElementById("err-email").innerHTML = "Email can not be empty";
        flag = false;
    }
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        document.getElementById("err-email").innerHTML = "Email should in valid format";
        flag = false;
    }
    else {
        document.getElementById("err-email").innerHTML = "";
    }

    return flag;
}

function showPopup(type) {
    if (type == "add") {
        add_btn.style.display = "block";
        update_btn.style.display = "none";
    }
    else {
        add_btn.style.display = "none";
        update_btn.style.display = "block";
    }
    document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
    fname.value = "";
    lname.value = "";
    pnum.value = "";
    email.value = "";
}

function getContactList() {
    if (localStorage.getItem("ContactList") == null) {
        return [];
    }
    else {
        return JSON.parse(localStorage.getItem("ContactList"));
    }
}

function setContactList(list) {
    localStorage.setItem("ContactList", JSON.stringify(list));
}