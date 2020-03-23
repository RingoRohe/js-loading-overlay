import Loader from './loader';
import loadingImage from '../img/loader_black.gif';

const ldr = new Loader({
    image: loadingImage
});

document.querySelector('#show3').addEventListener('click', (e) => {
    e.preventDefault();
    ldr.show({
        after: function() {
            window.setTimeout(function () {
                ldr.hide({
                    after: () => {
                        alert('loading finished');
                    }
                });
            }, 3000);
        }
    });
})

document.querySelector("#showPre").addEventListener("click", e => {
    e.preventDefault();
    ldr.show({
        elements: document.querySelectorAll("pre"),
        after: function() {
            window.setTimeout(function() {
                ldr.hide({
                    after: () => {
                        alert("loading finished");
                    }
                });
            }, 3000);
        }
    });
});
