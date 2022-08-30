import React from 'react';

const TestPage = () => {
  var html = document.querySelector('#html');
  populateIframe(
    html,
    `https://dashboard.gloground.com/app/dashboards#/view/a733b080-a916-11ec-9e1e-d9e3435853bd?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15w,to:now))&_a=(query:(match_phrase:(locqcer.keyword:'jinsookkim@glocalizeinc.com')))&hide-filter-bar=true`,
    [
      ['platform-host', 'dev.gloground.com'],
      [
        'token',
        'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGprYm41MjNAbmF2ZXIuY29tIiwiaWQiOjc3MjA1fSwiaWF0IjoxNjUwNTkxNjI2LCJleHAiOjE2NTA1OTI1MjYsImlzcyI6InBpY2h1In0.OEbBr6Rayu66A2EFUSHZlZ4RDCB3ZnLecYU-h3dUZHJ5ahoI0hI4taSP-Iqrsdhdc-Jp3zO0BoiKxxeP-3L9ug',
      ],
    ]
  );

  function populateIframe(url: any, body: any, headers: any) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'blob';
    headers.forEach(function (header: any) {
      xhr.setRequestHeader(header[0], header[1]);
    });
    xhr.send(body);

    xhr.onerror = (error: any) => {
      console.log(error);
    };

    function handler() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          // this.response is a Blob, because we set responseType above
          // iframe.src = URL.createObjectURL(xhr.response);
        } else {
          console.error('XHR failed', xhr);
        }
      }
    }
  }

  return (
    <>
      <div>
        <button
          onClick={() =>
            populateIframe(
              'http://localhost:3000/api/req',
              `https://dashboard.gloground.com/app/dashboards#/view/a733b080-a916-11ec-9e1e-d9e3435853bd?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15w,to:now))&_a=(query:(match_phrase:(locqcer.keyword:'jinsookkim@glocalizeinc.com')))&hide-filter-bar=true`,
              [
                ['platform-host', 'dev.gloground.com'],
                [
                  'token',
                  'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGprYm41MjNAbmF2ZXIuY29tIiwiaWQiOjc3MjA1fSwiaWF0IjoxNjUwNTkxNjI2LCJleHAiOjE2NTA1OTI1MjYsImlzcyI6InBpY2h1In0.OEbBr6Rayu66A2EFUSHZlZ4RDCB3ZnLecYU-h3dUZHJ5ahoI0hI4taSP-Iqrsdhdc-Jp3zO0BoiKxxeP-3L9ug',
                ],
              ]
            )
          }
        ></button>
      </div>
    </>
  );
};

export default TestPage;
