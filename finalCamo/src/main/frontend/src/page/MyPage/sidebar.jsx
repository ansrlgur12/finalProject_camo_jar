import React from 'react';
import { UserOutlined, SettingOutlined, HeartOutlined, CompassOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const { Sider } = Layout;

const SideBarContainer = styled.div`
background-color: white;
    @media screen and (max-width: 768px) {
     display: none;
    }
`;
const items = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: '나의 페이지',
    children: [
      {
        key: 'sub1-1',
        label: '나의 프로필',
        to: '/UserInfo'
      },
      {
        key: 'sub1-2',
        label: '내가 주문한 상품',
        to: '/OrderList'
      },
      {
        key: 'sub1-3',
        label: '장바구니',
        to: '/Cart'
      },
    ],
  },
  {
    key: 'sub2',
    icon: <SettingOutlined />,
    label: '나의 정보 변경',
    children: [
      {
        key: 'sub2-1',
        label: '프로필 수정',
        to: '/UserEdit'
      },
      {
        key: 'sub2-2',
        label: '비밀번호 변경',
        to: '/NewPassword'
      },
      {
        key: 'sub2-3',
        label: '회원 탈퇴',
        to: '/Delete'
      },
    ],
  },
  {
    key: 'sub3',
    icon: <HeartOutlined />,
    label: '나의 활동',
    children: [
      {
        key: 'sub3-1',
        label: '내가 쓴 댓글',
        to: '/MyComments'
      },
      {
        key: 'sub3-2',
        label: '내가 쓴 게시글',
        to: '/MyReview'
      },
    ],
  },
  {
    key: 'sub4',
    icon: <CompassOutlined />,
    label: '나의 캠핑장',
    children: [
      {
        key: 'sub4-1',
        label: '내가 등록한 캠핑장',
        to: '/MyOji'
      },
      {
        key: 'sub4-2',
        label: '좋아요 누른 캠핑장',
        to: '/MyCamp'
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const defaultOpenKeys = items.map((item) => item.key);

  return (
    <>
    <SideBarContainer>
    <Sider width={300} style={{
      marginTop : "10.5vh", 
      backgroundColor : 'white',
      '@media screen and (max-width: 768px)' : {
        display : 'none'
      }

      }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[]}
        style={{ height: '120%' }}
      >
        {items.map((item) => (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item
                key={child.key}
                onClick={() => child.to && navigate(child.to)}
              >
                {child.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </Sider>
    </SideBarContainer>
    </>
  );
};

export default Sidebar;
