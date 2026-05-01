import { User, Product, Transaction, Customer, Branch } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Minh Lê',
    email: 'admin@vibebrew.com',
    role: 'ADMIN',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGbBPjYoYXdd2Oj1Q5ibsOk6P_f7hgKv4gMD1OaVabmpdedcuLk8F8h1Jx0i9SDLHQe-XoipLfT5ioKdw43k9j0hU11KHW9Vx5j0Rm4Hww1WUF_kG_vaSiXiEM2Ysfd2IKTijnvuoNjCDHMFGXa1JPdPUJLsiNTVxYvVjlVqIlDdD9cVDtoXk9PCt6xp-BsAzJwM5g8_vvrmBFnmwRjvStp8AIEzT6qrnBxU8kaH16FBf1jNUllJoDZCJlw7Jpuiy4J_h_n-A7wx6w'
  },
  {
    id: 'u-ops',
    name: 'Quang Vinh (Ops)',
    email: 'ops@vibebrew.com',
    role: 'OPERATIONS_MANAGER',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'u2',
    name: 'Hoàng Anh',
    email: 'manager@vibebrew.com',
    role: 'BRANCH_MANAGER',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLfRV3zg0p4FTicsZWKL-ihGh7nce5wnpwN7EMmJ9nnml2TgUD6oxEluzo5cI03x3uB6wh-lkqwSiIJqlSSXnYljPEyvCz1J1GqPoRe-vE909ETqhj9c8eoJMM20XswfrGCCQ2WcUJT2Gs8dDcubJoD7WNFhE49sWHcqFQOn5CLNbLYPZJZgXz7EyZN9E_jNZjtETOe5FEpY_GNVrmNsdThr4h35JPriU2uhb7lpo2K1ajeNaRmJk2lbPuB6nVUnejFkIskjBEXrub',
    branchId: 'b1'
  },
  {
    id: 'u3',
    name: 'Minh Anh',
    email: 'staff@vibebrew.com',
    role: 'STAFF',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLYkLjd2Tb2oNtNtnoYKJDF-PXIo10m99sZhg1xBPnlr4M0gWzuFjIpCC_gMB-ve27CrCrVPQMjpQ7j7NehfpeP0v0Lf-Uph_pWNCWLQT126C7jmKH_eCFx2opUtPG0tucVdxoIk_Wkk2aYtQ5uck5wsiKCd42ODSCkbQXivn3OM_uhlaN2ndjat0TJiwOSmitcr4r1XZJec6PqyUMEaN9F1-wp5qz5WoZ5sD45sD4gLdH1lxiTEWY_i7S0dlFTPbSeeMz-LVMVfUt',
    branchId: 'b1'
  }
];

export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Vibe Brew Quận 1', address: '123 Lê Lợi, Quận 1, TP.HCM', managerId: 'u2' },
  { id: 'b2', name: 'Vibe Brew Quận 3', address: '45 Tú Xương, Quận 3, TP.HCM', managerId: 'u2' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Trà Sữa Vibe Brew',
    description: 'Trà đen đậm vị kết hợp sữa tươi nguyên kem béo ngậy.',
    price: 45000,
    category: 'Trà sữa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDinvlyyUSJmx3gzTkt4mI2OtWY--q2Sh2RV75Wx_b-SWyqa5WlvvicIcOWXZjd_kXyAPCwJWBsaMCBMkkd2Zhj4zLH7-O-R5yplCNC23kqAs7rBOWmhnt0v_q-s7j0cV3Qwb2-enmGMa7Zd7qkD7wScQ1NrqPPj_eGhfgcK-hcdIep1OWR5zD05IukPfYDfydwtnKoVa0B18P7kfKTcVIUfH8M4dbcJda7R0AqxyWkWtlkLftlvy1tbCR4E4kszIVqTiGcIYqK--rt',
    isBestSeller: true,
    isAvailable: true
  },
  {
    id: 'p2',
    name: 'Trà Trái Cây Nhiệt Đới',
    description: 'Trà nhài thơm nhẹ cùng 5 loại quả mọng tươi mát.',
    price: 55000,
    category: 'Trà trái cây',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVHuTNqTsd5F-Mvo13-U1RIQ5l5n1JW2ML_ZVd66UnOEotLHRF4wgbDpKPE_4aPFJLevu5FGAPaY4T00oblcYL_i6x7JNKJZmFMhXxJpzhM1PYDVptnJafQAK_UWeNqhSAS_ILt0ARiN9QUTIGbNdMarJHi860elGFZv60LES-M-rUe6AyH25kV81ch-XXhDC8K5d9lPCBRqDNGD7CDlNQiGov4BXp6prOIg7LOPSKhd6nTz8idyR1egZ4YlKo9xUH5TWOwszmjMOY',
    isAvailable: true
  },
  {
    id: 'p3',
    name: 'Cà Phê Muối',
    description: 'Vị mặn nhẹ từ lớp kem cheese mịn màng.',
    price: 35000,
    category: 'Cà phê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjwOlKTPDtsZZ65DGcBWMjK1YqR-XTSpO6f6SGaP2MaKLRqhOAD2fkEJgDklNgfXP11lTt1l3ykX5p00AWD7Qgb9_VWwKr_cpa5FqGvMX4E4cfgMbWkeuuCPaVaATwEizqQCWp9ITB3Vnng_s5OOeq8Mvsxo_ta-0zQZO68NP9iWScoMPWkmOUZSZoqu9i5YaRAq3AioQoBPe1hY08tCTcwMI5aZd_vYWAheoz21QtKRZ8Wo8vsSnIJjLL0jxAPfTULu0LisGPel2P',
    isAvailable: true
  },
  {
    id: 'p4',
    name: 'Bạc Xỉu',
    description: 'Cà phê sữa tầng quyến rũ vị truyền thống.',
    price: 32000,
    category: 'Cà phê',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjwOlKTPDtsZZ65DGcBWMjK1YqR-XTSpO6f6SGaP2MaKLRqhOAD2fkEJgDklNgfXP11lTt1l3ykX5p00AWD7Qgb9_VWwKr_cpa5FqGvMX4E4cfgMbWkeuuCPaVaATwEizqQCWp9ITB3Vnng_s5OOeq8Mvsxo_ta-0zQZO68NP9iWScoMPWkmOUZSZoqu9i5YaRAq3AioQoBPe1hY08tCTcwMI5aZd_vYWAheoz21QtKRZ8Wo8vsSnIJjLL0jxAPfTULu0LisGPel2P',
    isAvailable: true
  },
  {
    id: 'p5',
    name: 'Matcha Latte Nhật',
    description: 'Bột Matcha Uji thượng hạng kết hợp sữa tươi.',
    price: 52000,
    category: 'Đá xay',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-TPcljs-UaX7qcvKbzkdOcyc2AxFWXvz_jvktZf3PaG1exe8HdBJk7iGZQl7jMy1-dmv4DxjPYZVzNkkziUQU6Mx-N2wC00-cMwybCApSgu09lemyFeggZbPSoVGyvJQ0nOJtWBitoKhAiUWIx1EcsY1FVSHIY7tYJ3-GuM0H-Si7f_vAY2b1RQu-FWeAnnq_MSHL5W2j6awGzv9MLbW2jQiOLQ9wlYFSbcrLLAltuF8yGVNJPNeczDUJZpW8CzMUaPlyp7G81cLN',
    isAvailable: true
  },
  {
    id: 'p6',
    name: 'Choco Đá Xay',
    description: 'Chocolate nguyên chất xay cùng kem tươi whipping.',
    price: 60000,
    category: 'Đá xay',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2KlGooMogrUhbMrqucDtprkG6gwzc0Gp4s7JpxkWu0WlJMtBMimNuDw9pa-9XPNzS9QpHDqnOzfaD1td0LvWb2WNXA3PpMSgvfxQiVW5KLgu4IJyFfkv8o2ybtKWp8btiMSPis7JSoMUSqjggzUgwXBs02ngV3RgLm--cXpV-bwFkoPPoQx044y1UR7GfWjoKyyeUADMwe8ZAyUr9nG7WAxkVQpwbLOVwK-kN8Jts6qx0cu9n5qTTz3yoWITXjFrYYODzY2ObTeAx',
    isAvailable: true
  },
  {
    id: 'p7',
    name: 'Trân Châu Đen',
    description: 'Trân châu dai giòn, nấu mới mỗi ngày.',
    price: 5000,
    category: 'Topping',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2DNNXaXxszu6rjoUThTAwiWVICxZbOTcY4gdtkZPQf9UGBvjNL-Bm61Vm2VWBjBGZgqUtRq-xp9zD34belYDErjDKhcwmv9kb0Idl2CYMtJCpDlgNjZvJe31TlMu81N1qZbikdUFqgL8X30cz1ex3VIbZf_dRioCHN0JyatcZ7b3qFtzCXf38zmkirXGNP_4tpE_c1OEj6hZ0aDQZ8AZH_Da5C3DdoQ4xTfZJOwV3hQDQOcKfN-FJM9CCPuSC-9pbRcrpvsQrd3ux',
    isAvailable: true
  },
  {
    id: 'p8',
    name: 'Kem Cheese',
    description: 'Lớp kem béo mặn đặc trưng.',
    price: 10000,
    category: 'Topping',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2DNNXaXxszu6rjoUThTAwiWVICxZbOTcY4gdtkZPQf9UGBvjNL-Bm61Vm2VWBjBGZgqUtRq-xp9zD34belYDErjDKhcwmv9kb0Idl2CYMtJCpDlgNjZvJe31TlMu81N1qZbikdUFqgL8X30cz1ex3VIbZf_dRioCHN0JyatcZ7b3qFtzCXf38zmkirXGNP_4tpE_c1OEj6hZ0aDQZ8AZH_Da5C3DdoQ4xTfZJOwV3hQDQOcKfN-FJM9CCPuSC-9pbRcrpvsQrd3ux',
    isAvailable: true
  }
];

export const MOCK_PROMOS = [
  { code: 'VIBE10', description: 'Giảm 10% tổng đơn (Tất cả khách)', discount: 0.1, type: 'PERCENT' },
  { code: 'CHAOBANMOI', description: 'Giảm 20k cho đơn đầu tiên', discount: 20000, type: 'FIXED' },
  { code: 'VIP20', description: 'Giảm 20% cho khách Kim Cương', discount: 0.2, type: 'PERCENT', tier: 'KIM CƯƠNG' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Trần Anh Tuấn',
    email: 'tuan.tran@example.com',
    phone: '090 1234 567',
    tier: 'KIM CƯƠNG',
    points: 2450,
    totalSpent: 15400000,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATUzipLxv_Ifu3czduqGpX6saf2GIPvOM8egKXxRTZgyCQFkDnnDFCy-Bk5nOS8xT0GfQoRnqkhbFykqejIVWGwzFl3f0wm2n8kskQIueKOhHhf5eQMUwUcbTbytlbt1D_KPGGZgoCsU5pU3eATZvz41xvY1w_yUbBJVRhdkDpxAgfbKEgt3Tx0NSSs7LXl8MaU1AcFw5-OLq3wruBKW6Rd_q7YY0l0M3lHU4QE5CpcPWdU1CwbIKUlbRoN-QVUQL2bO3xTJL-UZrf'
  }
];
