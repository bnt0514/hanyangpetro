// Search functionality
const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Open search modal
searchBtn.addEventListener('click', () => {
    searchModal.style.display = 'flex';
    searchInput.focus();
});

// Close search modal
closeSearch.addEventListener('click', () => {
    searchModal.style.display = 'none';
    searchInput.value = '';
    searchResults.innerHTML = '';
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.style.display === 'flex') {
        searchModal.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Close on outside click
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        searchModal.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Search data structure - All actual products from markdown files
const searchData = [
    // EVA Products - 필름 (8 products)
    { title: "EVA 1214", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:0.4 VA:14% 고강도 농업용 산업용필름" },
    { title: "EVA 1218", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:0.6 VA:18% 고강도 고투명 농업용 산업용필름" },
    { title: "EVA 2020", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:0.5 VA:3.5% 가공성 강도 온상용 수축필름 종포용" },
    { title: "EVA 2030", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:0.8 VA:6.5% 고슬립성 광학성 온상용" },
    { title: "EVA 2040", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:0.8 VA:9.5% 가공성 광학성 온상용" },
    { title: "EVA 2050", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:0.8 VA:12% 가공성 광학성 온상용" },
    { title: "EVA 2240", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:2.0 VA:9.5% 가공성 광학성 일반포장용" },
    { title: "EVA 2250", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "필름 MI:2.0 VA:12% 가공성 광학성 일반포장용" },

    // EVA Products - 압출피복 (3 products)
    { title: "EVA 1125", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "압출피복 MI:18.0 VA:22% 저온열봉합성 접착성 라미넥스필름" },
    { title: "EVA 1157", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "압출피복 MI:16.0 VA:18% 고속가공성 라미넥스필름" },
    { title: "EVA 1159", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "압출피복 MI:18.0 VA:28% 가공성 접착력 라미넥스필름" },

    // EVA Products - 발포 (7 products)
    { title: "EVA 1315", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:1.8 VA:15% 가공성 기계적강도 신발용" },
    { title: "EVA 1316", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:1.8 VA:19% 가공성 신발용" },
    { title: "EVA 1317", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:2.0 VA:22% 가공성 탄성 신발용" },
    { title: "EVA 1326", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:3.0 VA:26% 가공성 탄성 신발용" },
    { title: "EVA 2315", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:1.8 VA:15% 가공성 신발용" },
    { title: "EVA 2319", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:2.5 VA:19% 가공성 신발용" },
    { title: "EVA 1328", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "발포 MI:2.5 VA:28% 가공성 탄성 신발용" },

    // EVA Products - 핫멜트 (6 products)
    { title: "EVA 1519", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "핫멜트 MI:150 VA:19% 가공성 접착력" },
    { title: "EVA 1520", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "핫멜트 MI:400 VA:19% 가공성 접착력" },
    { title: "EVA 1528", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "핫멜트 MI:150 VA:28% 가공성 접착력" },
    { title: "EVA 1529", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "핫멜트 MI:400 VA:28% 가공성 접착력" },
    { title: "EVA 1533", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "핫멜트 MI:25 VA:33% 가공성 접착력" },
    { title: "EVA 1540", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "핫멜트 MI:60 VA:40% 가공성 접착력" },

    // EVA Products - 전선 (4 products)
    { title: "EVA 1815", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "전선 MI:6.0 VA:15% 가공성 기계적물성 전선 컴파운드" },
    { title: "EVA 1828", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "전선 MI:4.0 VA:28% 기계적물성 전선 컴파운드" },
    { title: "EVA 1833", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "전선 MI:0.2 VA:33% 무기물충진성 전선 컴파운드" },
    { title: "EVA 1834", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "전선 MI:17.0 VA:33% 가공성 무기물충진성 전선 컴파운드" },

    // EVA Products - 태양전지 (4 products)
    { title: "EVA 1625", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "태양전지 MI:2.0 VA:25% 가공성 투명성 태양전지용Sheet" },
    { title: "EVA 1626", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "태양전지 MI:3.0 VA:26% 가공성 투명성 태양전지용Sheet" },
    { title: "EVA 1629", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "태양전지 MI:7.0 VA:28.5% 가공성 투명성 태양전지용Sheet" },
    { title: "EVA 1631", path: "제품소개 > EVA", url: "/kr/products/eva/", content: "태양전지 MI:26.0 VA:28% 가공성 투명성 태양전지용Sheet" },

    // LDPE Products - 필름 (14 products)
    { title: "LDPE 5301", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:0.3 밀도:0.921 몰딩가공성 의료용 화장품용" },
    { title: "LDPE 5302", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:0.3 밀도:0.922 강도 중포용 온상용" },
    { title: "LDPE 5303", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:0.3 밀도:0.921 강도 수축성 수축필름" },
    { title: "LDPE 5306", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:3.0 밀도:0.921 가공성 고투명포장용" },
    { title: "LDPE 5310", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:0.8 밀도:0.923 가공성 강도 온상용 수축필름" },
    { title: "LDPE 5316", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:0.8 밀도:0.922 가공성 온상용 가교발포용" },
    { title: "LDPE 5316F", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:1.05 밀도:0.923 강도 가교발포용" },
    { title: "LDPE 5318", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:3.0 밀도:0.923 강도 광학성 일반포장용" },
    { title: "LDPE 5320", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:2.0 밀도:0.921 가공성 강도 일반포장용" },
    { title: "LDPE 5321", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:3.0 밀도:0.921 가공성 일반포장용" },
    { title: "LDPE 5321F", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:3.4 밀도:0.923 가공성 물성 무가교발포용" },
    { title: "LDPE 5322F", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:4.0 밀도:0.923 가공성 무가교발포용" },
    { title: "LDPE 5325", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:4.0 밀도:0.923 가공성 광학성 일반포장용" },
    { title: "LDPE 830", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "필름 MI:2.0 밀도:0.921 가공성 광학성 보호필름 전선용베이스수지" },

    // LDPE Products - 압출피복 (4 products)
    { title: "LDPE 950", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "압출피복 MI:7.5 밀도:0.919 고속가공성 연포장 종이코팅용" },
    { title: "LDPE 951", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "압출피복 MI:8.5 밀도:0.919 고속가공성 연포장 종이코팅용" },
    { title: "LDPE 955", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "압출피복 MI:7.7 밀도:0.919 네크인 열봉합강도 연포장 종이코팅용" },
    { title: "LDPE 963", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "압출피복 MI:10.0 밀도:0.919 고속가공성 타포린 종이코팅용" },

    // LDPE Products - 사출 (4 products)
    { title: "LDPE 724", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "사출 MI:45.0 밀도:0.915 흐름성 저온충격강도 가정용기 뚜껑류 장난감" },
    { title: "LDPE 737", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "사출 MI:22.0 밀도:0.915 흐름성 저온충격강도 가정용기 뚜껑류 장난감" },
    { title: "LDPE 749", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "사출 MI:6.0 밀도:0.919 내균열성 가정용기 뚜껑류" },
    { title: "LDPE 303", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "사출 MI:6.0 밀도:0.919 가공성 발포용 병마개라이너" },

    // LDPE Products - 중공성형 (1 product)
    { title: "LDPE 5602S", path: "제품소개 > LDPE", url: "/kr/products/ldpe/", content: "중공성형 MI:0.8 밀도:0.921 가공성 광학성 식품용기 소형Bottle" },

    // LLDPE Products - 필름 (9 products)
    { title: "LLDPE 3120", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.0 밀도:0.920 강도 광학성 일반포장용" },
    { title: "LLDPE 3120MF", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:0.9 밀도:0.922 가공성 강도 내후성 멀칭용" },
    { title: "LLDPE 3123", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.0 밀도:0.924 가공성 강도 광학성 논슬립 라미용 중포용" },
    { title: "LLDPE 3126", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.0 밀도:0.921 광학성 개구성 내환경변성 박층필름용" },
    { title: "LLDPE 3127D", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.0 밀도:0.920 광학성 가공성 라미네이션필름용" },
    { title: "LLDPE 3224", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:2.0 밀도:0.920 가공성 강도 일반포장용" },
    { title: "LLDPE 4200D", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.6 밀도:0.920 광학성 가공성 라미네이션필름용" },
    { title: "LLDPE 4300N", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.0 밀도:0.924 개구성 광학성 고슬립성 일반포장용" },
    { title: "LLDPE 4300S", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "필름 MI:1.0 밀도:0.924 개구성 광학성 저슬립성 일반포장용" },

    // LLDPE Products - 압출피복 (2 products)
    { title: "LLDPE 9730", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "압출피복 MI:15.0 밀도:0.922 고속가공성 네크인 타포린코팅용" },
    { title: "LLDPE 9730D", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "압출피복 MI:15.0 밀도:0.922 고속가공성 네크인 타포린코팅용" },

    // LLDPE Products - 사출/회전성형 (2 products)
    { title: "LLDPE 7635", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "사출성형 MI:20.0 밀도:0.924 가공성 내환경응력성 가정용기 장난감" },
    { title: "LLDPE 2558", path: "제품소개 > LLDPE", url: "/kr/products/lldpe/", content: "회전성형 MI:5.0 밀도:0.935 표면평활도 가공성 강도 화학용기 물탱크" },

    // HDPE Products (7 products)
    { title: "HDPE 7600", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "사출용 MI:6.6 밀도:0.959 가공성 충격강도 운반용기 일반용기" },
    { title: "HDPE 3392", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "Yarn용 MI:1.1 밀도:0.954 연신율 인장성 타포린Yarn용" },
    { title: "HDPE 7390", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "BottleCap MI:4.0 밀도:0.958 가공성 Cap생수HotFill 일반사출용" },
    { title: "HDPE 9030", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "전선 MI:0.2 밀도:0.939 가공성 전선용컴파운드 방수포용" },
    { title: "HDPE 9031", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "전선 MI:0.2 밀도:0.944 가공성 전선용컴파운드" },
    { title: "HDPE 3390", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "모노필라멘트 MI:0.9 밀도:0.954 연신율 인장특성 모노필라멘트용" },
    { title: "HDPE 3390UV", path: "제품소개 > HDPE", url: "/kr/products/hdpe/", content: "모노필라멘트 MI:0.9 밀도:0.954 연신율 인장특성 내후성 모노필라멘트용" },

    // mLLDPE Products (12 products)
    { title: "mLLDPE M1835HN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:3.5 밀도:0.916 강도 광학성 스트레치성 스트레치랩 캐스트필름" },
    { title: "mLLDPE M1810HA", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:1.0 밀도:0.920 강도 열봉합성 저슬립 라미네이션필름" },
    { title: "mLLDPE M1810HN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:1.0 밀도:0.920 강도 열봉합성 논슬립 라미네이션 일반포장" },
    { title: "mLLDPE M1810HC", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:1.0 밀도:0.920 강도 고슬립 일반포장" },
    { title: "mLLDPE M2710HN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:1.0 밀도:0.928 강도 Stiffness 종포" },
    { title: "mLLDPE M2535HN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:4.0 밀도:0.925 강도 내압성 투습도 다이아퍼필름" },
    { title: "mLLDPE M2010EA", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:1.0 밀도:0.920 가공성 광학성 농업용 일반포장" },
    { title: "mLLDPE M2010EN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:1.0 밀도:0.918 가공성 논슬립 농업용 일반포장" },
    { title: "mLLDPE M1605EN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:0.5 밀도:0.916 기계적물성 투명성 스트레치후드 수축필름" },
    { title: "mLLDPE M3505EN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:0.5 밀도:0.935 강도 Stiffness 일반포장" },
    { title: "mLLDPE M2703EN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:0.3 밀도:0.929 강도 수축 수축필름" },
    { title: "mLLDPE M3705AN", path: "제품소개 > mLLDPE", url: "/kr/products/mllldpe/", content: "MI:0.5 밀도:0.937 내압특성 ESCR 정수기튜브" },

    // Formosa Products (6 products)
    { title: "Formosa FL2202A", path: "제품소개 > 수입품 > Formosa", url: "/kr/products/other/imported/formosa/", content: "수입품 LDPE MI:2.0 밀도:0.923 SlipAntiblock 우수한가공성광학성 BlendPartner 수축필름 냉동필름 라미네이션" },
    { title: "Formosa FL2202C", path: "제품소개 > 수입품 > Formosa", url: "/kr/products/other/imported/formosa/", content: "수입품 LDPE MI:2.0 밀도:0.923 우수한광학성기계적성능 냉동필름 라미네이션 쇼핑백 섬유포장" },
    { title: "Formosa FR2375C", path: "제품소개 > 수입품 > Formosa", url: "/kr/products/other/imported/formosa/", content: "수입품 LDPE MI:0.75 밀도:0.923 FractionalMelt 높은강성파단강도 농업용필름 수축필름 라미네이션" },
    { title: "Formosa FC2304E", path: "제품소개 > 수입품 > Formosa", url: "/kr/products/other/imported/formosa/", content: "수입품 LDPE MI:4.0 밀도:0.923 Slip900ppm AB1200ppm 우수한광학성 캐스트필름 지퍼백 포장필름" },
    { title: "Formosa LB1810E3", path: "제품소개 > 수입품 > Formosa", url: "/kr/products/other/imported/formosa/", content: "수입품 LLDPE MI:1.0 밀도:0.918 SlipAntiblock있음 내충격강도우수 농업용필름 산업용라이너 산업포장" },
    { title: "Formosa E924", path: "제품소개 > 수입품 > Formosa", url: "/kr/products/other/imported/formosa/", content: "수입품 HDPE MI:0.04 HLMI:8.5 밀도:0.949 HMW 높은강성내충격 티셔츠백 라이너 중포장백" },

    // SCGC Products (2 products)
    { title: "SCGC L1210F", path: "제품소개 > 수입품 > SCGC", url: "/kr/products/other/imported/sgcg/", content: "수입품 LLDPE MI:1.0 밀도:0.920 고생산성광학성강도 일반포대 산업용포대 쌀포대" },
    { title: "SCGC L1220F", path: "제품소개 > 수입품 > SCGC", url: "/kr/products/other/imported/sgcg/", content: "수입품 LLDPE MI:2.0 밀도:0.920 고광학성고인장우수기계적성능 범용포대 라미네이션필름 쇼핑백" },

    // Qapco Products (2 products)
    { title: "Qapco Q1018H", path: "제품소개 > 수입품 > Qapco", url: "/kr/products/other/imported/qapco/", content: "수입품 LLDPE Lotrene MI:1.0 밀도:0.918 SlipAB1500-3200ppm 안정적필름균일한물성 수축필름 라이너 FFS 농업용필름" },
    { title: "Qapco LA0710", path: "제품소개 > 수입품 > Qapco", url: "/kr/products/other/imported/qapco/", content: "수입품 LDPE Lotrene ExtrusionCoating MI:8.0 밀도:0.918 고속ExtrusionCoating Low-Neck-in 우수한실링성 지류코팅 알루미늄라미네이션 방수포" },

    // Reliance Products (2 products)
    { title: "Reliance JF19010", path: "제품소개 > 수입품 > Reliance", url: "/kr/products/other/imported/reliance/", content: "수입품 LLDPE Relene MI:1.0 밀도:0.918 SlipAntiblock있음 고인장고충격 블로운필름 라이너백 라미네이션필름" },
    { title: "Reliance JF18010", path: "제품소개 > 수입품 > Reliance", url: "/kr/products/other/imported/reliance/", content: "수입품 LLDPE Relene MI:1.0 밀도:0.918 SlipAB없음 광학성우수 블로운필름 포장필름 소비재포장" },

    // Documents - RoHS & 할로겐 프리
    { title: "RoHS 인증서", path: "자료실 > RoHS", url: "/kr/documents/rohs/", content: "자료실 RoHS 유해물질 제한 지침 인증서 EVA HCR HDPE LDPE LLDPE mLLDPE" },
    { title: "할로겐 프리 인증서", path: "자료실 > RoHS", url: "/kr/documents/rohs/", content: "자료실 할로겐 프리 인증서 Halogen Free EVA HCR HDPE LDPE LLDPE mLLDPE" },

    // Documents - REACH
    { title: "REACH SVHC Free 선언서", path: "자료실 > REACH", url: "/kr/documents/reach/", content: "자료실 REACH 화학물질 등록 평가 허가 제한 SVHC 고위험성 우려물질 부재 선언서" },

    // Documents - MSDS
    { title: "MSDS EVA", path: "자료실 > MSDS", url: "/kr/documents/msds/", content: "자료실 물질안전보건자료 Material Safety Data Sheet msds EVA 한국 유럽 미국" },
    { title: "MSDS HDPE", path: "자료실 > MSDS", url: "/kr/documents/msds/", content: "자료실 물질안전보건자료 Material Safety Data Sheet msds HDPE" },
    { title: "MSDS LDPE", path: "자료실 > MSDS", url: "/kr/documents/msds/", content: "자료실 물질안전보건자료 Material Safety Data Sheet msds LDPE 한국 미국" },
    { title: "MSDS LLDPE", path: "자료실 > MSDS", url: "/kr/documents/msds/", content: "자료실 물질안전보건자료 Material Safety Data Sheet msds LLDPE 한국 미국" },
    { title: "MSDS mLLDPE", path: "자료실 > MSDS", url: "/kr/documents/msds/", content: "자료실 물질안전보건자료 Material Safety Data Sheet msds mLLDPE" },

    // Documents - Product Regulatory Information
    { title: "제품 규제 정보", path: "자료실 > 제품 규제 정보", url: "/kr/documents/regulatory/", content: "자료실 Product Regulatory Information 유해물질 선언서 LDPE LLDPE MDPE HDPE mLLDPE EVA" },

    // Documents - ISO 인증서
    { title: "ISO 9001 품질경영시스템", path: "자료실 > ISO 인증서", url: "/kr/documents/iso/", content: "자료실 ISO 9001:2015 품질경영시스템 인증서 Quality Management System" },
    { title: "ISO 14001 환경경영시스템", path: "자료실 > ISO 인증서", url: "/kr/documents/iso/", content: "자료실 ISO 14001:2015 환경경영시스템 인증서 Environmental Management System" },
    { title: "ISO 45001 안전보건경영시스템", path: "자료실 > ISO 인증서", url: "/kr/documents/iso/", content: "자료실 ISO 45001:2018 안전보건경영시스템 인증서 Occupational Health and Safety Management System" }
];

// Search function
function performSearch(query) {
    if (!query || query.trim().length === 0) {
        searchResults.innerHTML = '<div class="no-results">검색어를 입력해주세요.</div>';
        return;
    }

    query = query.trim().toLowerCase();
    // Remove spaces for flexible matching (e.g., "mi 3" matches "mi:3")
    const queryNoSpace = query.replace(/\s+/g, '');

    // Check if query is purely numeric
    const isNumericQuery = /^\d+$/.test(query.replace(/\s+/g, ''));

    const results = searchData.filter(item => {
        // Exclude documents section if query is purely numeric
        if (isNumericQuery && item.path.includes('자료실')) {
            return false;
        }

        const titleNoSpace = item.title.toLowerCase().replace(/\s+/g, '');
        const contentNoSpace = item.content.toLowerCase().replace(/\s+/g, '');
        // path search removed to prevent "제품" matching all products

        return item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query) ||
            titleNoSpace.includes(queryNoSpace) ||
            contentNoSpace.includes(queryNoSpace);
    });

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }

    let html = `<div class="results-count">${results.length}개의 결과를 찾았습니다.</div>`;

    results.forEach(result => {
        html += `
      <div class="search-result-item">
        <div class="result-path">${result.path}</div>
        <a href="${result.url}" class="result-title">${highlightMatch(result.title, query)}</a>
        <div class="result-content">${highlightMatch(result.content, query)}</div>
      </div>
    `;
    });

    searchResults.innerHTML = html;
}

// Highlight matching text
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Search on input
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch(e.target.value);
    }, 300);
});

// Search on Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        clearTimeout(searchTimeout);
        performSearch(e.target.value);
    }
});
