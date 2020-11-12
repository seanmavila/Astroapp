const list_items = document.querySelectorAll('.galaxyItem');
const lists = document.querySelectorAll('.list');

var encryptedAES = CryptoJS.AES.encrypt("Javascript can suck my ass", "Password");
console.log("Encrypted Message :: " + encryptedAES.toString());
var decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "Password");
var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
console.log("Decrypted Message :: " + plaintext);


let draggedItem = null;
let draggedItemData = null;
for(let i = 0; i < list_items.length; i++)
{
    const item = list_items[i];

    item.addEventListener('dragstart', function (e) {
        draggedItem = item;
        draggedItemData = item.id;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0);
        
    });

    item.addEventListener('dragend', function () {
        setTimeout(function() {
            draggedItem.style.display = 'block';
            draggedItem = null;
            draggedItemData = null;
        }, 0);

    });
    for(let j = 1; j < lists.length; j++)
    {
        const list = lists[j];
        list.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });

        list.addEventListener('dragleave', function(e) {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        list.addEventListener('drop', function (e) {
            const isCorrect = draggedItemData == this.id;
            if(isCorrect)
            {
                this.append(draggedItem);
            }
            
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
    }
}