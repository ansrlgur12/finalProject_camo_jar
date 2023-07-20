import axios from 'axios';

export const CAMO_DOMAIN = "http://localhost:8111";

const NaverAPI = {

    SearchBlogs: async(query) => {
        return await axios.get(`${CAMO_DOMAIN}/open/naver/blog?query=${query}`);
    }

};

export default NaverAPI;
