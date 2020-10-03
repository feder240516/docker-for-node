

export default function getUrl(){
    if (process.env.REACT_APP_PLACE === 'local')return 'http://localhost:8080'
    else return 'http://10.3.2.4';
}