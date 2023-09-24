import {useContext} from "react";

import {ContactContext} from "../context/contact-context";
import {PURPLE} from "../../helpers/app-theme-colors";

const SearchContact = () => {
    const {searchContact} = useContext(ContactContext);

    return (
        <div className="input-group w-auto" dir="ltr">
            <span className="input-group-text border-0" id="search-input" style={{backgroundColor: PURPLE}}>
                <i className="fa fa-search"/>
            </span>
            <input type="text" className="form-control" placeholder="جستجوی مخاطب"
                   aria-label="جستجوی مخاطب"
                   aria-describedby="search-input"
                   onChange={(event) => searchContact(event.target.value)}
                   dir="rtl"
            />
        </div>
    );
}

export default SearchContact;