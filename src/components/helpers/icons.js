import { library } from "@fortawesome/fontawesome-svg-core";

import { 
    faTrash,
    faSignOutAlt,
    faEnvelopeSquare,
    faKey
    } from "@fortawesome/free-solid-svg-icons";

    const Icons = () => {
        return library.add(faTrash, faSignOutAlt, faEnvelopeSquare, faKey);
    };

    export default Icons;
