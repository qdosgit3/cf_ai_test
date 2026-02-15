
import React, { useState, Dispatch, SetStateAction } from 'react';


interface LlmProps {

	  input_str: string;

  api_call_bool: boolean;                            // The state value
  
  set_api_call_bool: Dispatch<SetStateAction<boolean>>; // The state setter
  
  llm_resp: string;                            // The state value
  
  set_llm_resp: Dispatch<SetStateAction<string>>; // The state setter
  
}


const Llm = ({ input_str, api_call_bool, set_api_call_bool, llm_resp, set_llm_resp }: LlmProps) => {

    function handle_change(e: React.ChangeEvent<HTMLTextAreaElement>) {

    console.log('a');	     

    }

    if (api_call_bool === false) {
	
	return (
	    <>
		<em>Current status:...</em>
		<br/>
		<br/>
	    </>
	)
	
    } else {
	
	call_llm(input_str, llm_resp, set_llm_resp);

	return (
		<div className="loading">Calling Llama 3.1 API</div>
	)

 }
	
};


export default Llm;

export async function call_llm(llm_req: string, llm_resp: string, set_llm_resp: Dispatch<SetStateAction<string>>) {

    const llm_json = await fetch_with_retries(llm_req, 100);

    store_data(llm_req, llm_json, llm_resp, set_llm_resp);

};


async function fetch_with_retries(llm_req: string, retry_count: number) {

     const ACCOUNT_ID = 'your_account_id_here';
     const API_TOKEN = 'your_api_token_here';

     const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`;
      
    try {
	
    return await fetch(url, {
      method: 'POST',
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: llm_req
      })
      }).then(res => res.json());

    } catch (error) {

    console.log("retrying fetch(), retry_count");

if (retry_count < 5) {

return fetch_with_retries(llm_req, retry_count + 1);

} else {

return JSON.stringify({
status: false
})

}

}
    
};


export function store_data(llm_req: string, llm_json: Record<string, string>, llm_resp: string, set_llm_resp: Dispatch<SetStateAction<string>>) {
    
    console.log("store_data()", llm_json, "\n", llm_json.features[0])

    try {
	
	// const top_hit_coords = llm_json.features[0].geometry.coordinates;

	// const source_obj = {
	//     'postcode': postcode,
	//     'longitude': top_hit_coords[0],
	//     'latitude': top_hit_coords[1],
	//     'borough': borough
	// };

	console.log("source_obj()");

	// set_llm_resp(source_obj);

    } catch {

    }

};