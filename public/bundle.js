(function (React, client) {
	'use strict';

	function Editor({
	  set_page_flow
	}) {
	  function handle_data_update() {
	    console.log("test");
	    set_page_flow(10);
	  }
	  return /*#__PURE__*/React.createElement("div", {
	    className: "editor"
	  }, /*#__PURE__*/React.createElement("div", {
	    className: "topbar"
	  }, /*#__PURE__*/React.createElement("button", {
	    onClick: handle_data_update
	  }, "Continue with entered set"), /*#__PURE__*/React.createElement("div", {
	    className: "loading"
	  }, "The clinic set is not currently valid, hit F5/reload if you want to load defaults")));
	}

	function App() {
	  const [page_flow, set_page_flow] = React.useState(5);
	  const [form_data, set_form_data] = React.useState({
	    "name": "",
	    "message": ""
	  });
	  const [booking, set_booking] = React.useState();
	  switch (page_flow) {
	    case 5:
	      return /*#__PURE__*/React.createElement(Editor, {
	        set_page_flow: set_page_flow
	      });
	  }
	}

	const root = client.createRoot(document.getElementById('root'));
	root.render(/*#__PURE__*/React.createElement(App, null));

})(React, client);
