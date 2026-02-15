import React from 'react';
import { useState } from 'react';



import Editor from './Editor.js'


function App() {

    const [page_flow, set_page_flow] = useState(5);

    const [form_data, set_form_data] = useState({ "name": "",
						  "message": "" });

    const [booking, set_booking] = useState();

    switch (page_flow) {

    case 5:

	return(
		<Editor
	    set_page_flow={set_page_flow}
		/>	    
	)
	
    }

}
    
export default App;
