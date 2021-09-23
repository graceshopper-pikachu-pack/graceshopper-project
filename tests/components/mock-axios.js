import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
const mock = new MockAdapter(axios);

afterEach(() => mock.reset());

export default mock;
