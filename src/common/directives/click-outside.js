// ------------------
// Helpers
// ------------------

const isChild = (child, node) => {
    while (child !== null) {
        if (child === node) return true;
        child = child.parentNode;
    }
    return false;
};



// ------------------
// Exports
// ------------------

export default function() {

    let click = null;

    return {

        bind (element, binding) {
            click = event => !isChild(event.target, element) && binding.value();
            document.addEventListener('click', click);
        },

        unbind () {
            document.removeEventListener('click', click);
        }

    }

}

