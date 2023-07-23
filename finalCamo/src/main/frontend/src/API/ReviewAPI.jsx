import axios from 'axios';

export const CAMO_DOMAIN = "";

const NaverAPI = {

    SearchBlogs: async(query) => {
        return await axios.get(`${CAMO_DOMAIN}/open/naver/blog?query=${query}`);
    }

};

export default NaverAPI;
