import {createHash} from 'crypto';

const hash = (txt:string) => {
    return createHash('sha1').update(txt).digest('hex');
}

export default hash;