import React, { useEffect, useState } from 'react';
// import * as styles from './dashboardlist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/fontawesome-free-solid';
import { faFileImage } from '@fortawesome/fontawesome-free-solid';
import { faList } from '@fortawesome/fontawesome-free-solid';
import { faLocationDot } from '@fortawesome/fontawesome-free-solid';
import searchIcon from '../../../static/images/Icon feather-search.png';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import DashboardListView from '../../components/Dashboard/DashboardListView';
import DashboardImageView from '../../components/Dashboard/DashboardImageView';
import DashboardMapView from '../../components/Dashboard/DashboardMapView';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Button } from 'react-bootstrap';
import { makeStyles } from "@material-ui/core/styles";
import Seo from "../../components/seo";
// import { Autocomplete } from "@react-google-maps/api";
import Loader from '../../components/Loader';
import { RiFileTextLine, RiListUnordered, RiMapPinFill, RiFileDamageLine } from "react-icons/ri";
import { Link, navigate } from "gatsby";
import Footer from '../../components/Footer';
import { usePlacesWidget } from "react-google-autocomplete";
import Map from '../../components/Dashboard/MapMarker';
import { withScriptjs } from 'react-google-maps';
import '../../assets/common.css'
import { useDispatch, useSelector } from 'react-redux';
import { dashboardDetails, dashboardGoogleSearch, dashboardHomeType, dashboardPage, dashboardPrice, dashboardRoom, dashboardSearch } from '../../state/dashboardViewAction';
function DashboardList({ location }) {
    const d_search = useSelector(state => state.dashboard)
    console.log('search', d_search)
    console.log('location state', location.state)
    const [storage, setStorage] = useState(false);
    const [place, setPlace] = useState({})
    const [price, setPrice] = useState({
        min: d_search.price !== undefined ? d_search.price.min : null,
        max: d_search.price !== undefined ? d_search.price.max : null,
        displayMin: d_search.price !== undefined ? d_search.price.displayMin : null,
        displayMax: d_search.price !== undefined ? d_search.price.displayMax : null,
    })
    const [isList, setIsList] = useState(false)
    const [isMap, setIsMap] = useState(false)
    const [isImage, setIsImage] = useState(false)
    //console.log("--userType--",userType);
    const dispatch = useDispatch()
    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");
        if (!storedData) {

            setStorage(false);
        } else {
            setStorage(true);

        }
    }, []);

    const initialState = {
        list: d_search.page !== undefined ? d_search.page.list : true,
        image: d_search.page !== undefined ? d_search.page.image : false,
        map: d_search.page !== undefined ? d_search.page.map : false
    }
    const initialFilterState = {
        price: false,
        bedBath: false,
        homeType: false,
        moreFilter: false
    }

    const [listingType, setListingType] = useState(initialState);
    const [filterType, setFilterType] = useState(initialFilterState);
    var searchFilter = {
        searchText: d_search.search !== undefined ? d_search.search.name : '',
        searchDisplay: d_search.search !== undefined ? d_search.search.displayName : "",
        bed: d_search.room !== undefined ? d_search.room.bed : '',
        bath: d_search.room !== undefined ? d_search.room.bath : '',
        homeTypeString: d_search.homeType !== undefined ? d_search.homeType : '',
        squareFeetMin: d_search.details !== undefined ? d_search.details.squareFeetMin : '',
        squareFeetMax: d_search.details !== undefined ? d_search.details.squareFeetMax : '',
        pricesquareFeetMin: d_search.details !== undefined ? d_search.details.pricesquareFeetMin : '',
        pricesquareFeetMax: d_search.details !== undefined ? d_search.details.pricesquareFeetMax : '',
        lotSizeMin: d_search.details !== undefined ? d_search.details.lotSizeMin : '',
        lotSizeMax: d_search.details !== undefined ? d_search.details.lotSizeMax : '',
        yearBuildMin: d_search.details !== undefined ? d_search.details.yearBuildMin : '',
        yearBuildMax: d_search.details !== undefined ? d_search.details.yearBuildMax : '',
        costFinance: d_search.details !== undefined ? d_search.details.costFinance : '',
        poolType: d_search.details !== undefined ? d_search.details.poolType : '',
        amenitiesString: d_search.details !== undefined ? d_search.details.amenitiesString : '',
        houseViewString: d_search.details !== undefined ? d_search.details.houseViewString : '',
        storiesMin: d_search.details !== undefined ? d_search.details.storiesMin : '',
        storiesMax: d_search.details !== undefined ? d_search.details.storiesMax : '',
        walkScore: d_search.details !== undefined ? d_search.details.walkScore : '',
        bikeScore: d_search.details !== undefined ? d_search.details.bikeScore : '',
    }
    const [searchFields, setSearchFields] = useState(searchFilter);
    const [autoComplete, setAutoComplete] = useState(null);
    const [address, setAddress] = useState("");
    const [valuePrice, setValue] = React.useState([]);
    const [loader, setLoader] = useState(false);

    const SquareFeetArray = {
        500: "500",
        750: "750",
        1000: "1,000",
        1250: "1,250",
        1500: "1,500",
        1750: "1,750",
        2000: "2,000",
        2250: "2,250",
        2750: "2,750",
        3000: "3,000",
        3500: "3,500",
        3500: "3,500",
        3500: "3,500",
        4000: "4,000",
        4000: "4,000",
        5000: "5,000",
        7500: "7,500",
    };

    const LotSizeArray = {
        1000: "1,000 sqft",
        2000: "2,000 sqft",
        3000: "3,000 sqft",
        4000: "4,000 sqft",
        5000: "5,000 sqft",
        7500: "7,500 sqft",
        10890: "1/4 acre/10,890 sqft",
        21780: "1/2 acre",
        43560: "1 acre",
        87120: "2 acres",
        217800: "5 acres",
        435600: "10 acres",
        871200: "20 acres",
        2178000: "50 acres",
        4356000: "100 acres",
    };

    const HOAFees = {
        0: "No HOA Fee",
        50: "$50/month",
        100: "$100/month",
        200: "$200/month",
        300: "$300/month",
        400: "$400/month",
        500: "$500/month",
        600: "$600/month",
        600: "$600/month",
        700: "$700/month",
        800: "$800/month",
        900: "$900/month",
        1000: "$1000/month",
    };

    const StoriesArray = {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
    }

    const PoolTypeArray = {
        "in_ground": "In-Ground",
        "infinity": "Infinity",
        "lap": "Lap",
        "swim_spas": "Swim Spas",
        "hot_tubs_spas": "Hot Tubs and Spas",
    }

    let filterPropertySelect = {
        SquareFeetArrMin: SquareFeetArray,
        SquareFeetArrMax: SquareFeetArray,
        PriceSquareFeetArrMin: SquareFeetArray,
        PriceSquareFeetArrMax: SquareFeetArray,
        LotSizeArrMin: LotSizeArray,
        LotSizeArrMax: LotSizeArray,
        StoriesArrMin: StoriesArray,
        StoriesArrMax: StoriesArray,
    }
    const [filterPropArr, setfilterPropArr] = useState(filterPropertySelect);

    function squareFeet() {
        // let str = '';
        // for (var i = 0; i <= 3000; i += 250) {
        //   str = str + i + ',';
        // }
        // console.log(str+'4,000,5,000,');
    }
    // if(location.state.keyword != '')
    //     handleKeyDown();

    const useStyles = makeStyles({
        root: {
            "&>.MuiSlider-thumb": {
                height: "10 !important",
                width: "12 !important",
                "&:nth-child(4)": {
                    color: "#0490fb !important",
                    border: "3px solid #fff !important"
                },
                "&:nth-child(5)": {
                    color: "#0490fb !important",
                    border: "3px solid #fff !important"
                }
            },
            "&>.MuiSlider-track": {
                color: "#0490fb !important"
            },
            "&>.MuiSlider-root": {
                color: "#0490fb !important"
            },
            "&>.MuiSlider-rail": {
                color: "#A9A9A9 !important"
            },
        }
    });
    const classes = useStyles();

    // Changing State
    const rangeSelector = (event, newValue) => {
        setValue(newValue);
    };
    /***Price range***/

    //const toggleShow = () => {setShow(p => !p);}
    const priceShow = () => { setFilterType({ price: !filterType.price, bedBath: false, homeType: false, moreFilter: false }); }
    const bedBathShow = () => { setFilterType({ price: false, bedBath: !filterType.bedBath, homeType: false, moreFilter: false }); }
    const homeTypeShow = () => { setFilterType({ price: false, homeType: !filterType.homeType, bedBath: false, moreFilter: false }); }
    const moreFilterShow = () => { setFilterType({ price: false, moreFilter: !filterType.moreFilter, bedBath: false, homeType: false }); }
    const isListShow = () => { setFilterType({ price: false, bedBath: false, homeType: false, moreFilter: false }); }

    // const listView = () => {
    //     setListingType(initialState);
    //     activeItem('list');
    // }
    // const imageView = () => {
    //     setListingType({ list: false, image: true, map: false });
    //     activeItem('image');
    // }
    // const mapView = () => {
    //     setListingType({ list: false, image: false, map: true });
    //     activeItem('map');
    // }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(dashboardGoogleSearch({ lat: null, lng: null, zoom: null }))
            setSearchFields({ ...searchFields, searchDisplay: ref.current.value, searchText: ref.current.value })
            let data = {
                name: ref.current.value,
                displayName: ref.current.value
            }
            dispatch(dashboardSearch(data))
            // alert('do validate')
            //window.history.replaceState(null, '')
            passPropsToChild();

        }
    }
    const handlesearchSubmit = () => {
        dispatch(dashboardGoogleSearch({ lat: null, lng: null, zoom: null }))
        setSearchFields({ ...searchFields, searchText: ref.current.value, searchDisplay: ref.current.value })
        let data = {
            name: ref.current.value,
            displayName: ref.current.value
        }
        dispatch(dashboardSearch(data))
        //if(searchFields.searchText != '') 
        passPropsToChild();
    }
    const passPropsToChild = () => {

        // let datas={
        //     name:ref.current.value.split(',')[0],
        //     displayName:ref.current.value
        // }
        // dispatch(dashboardSearch(datas))
        // let data={
        //     name:ref.current.value.split(',')[0],
        //     displayName:searchFields.searchDisplay
        // }
        // dispatch(dashboardSearch(data))
        // setLoader(true);
        // if (document.getElementsByClassName('search-list')[0].value === '') {
        //     let data = {
        //         lat: 39.6693,
        //         lng: -98.3476,
        //         zoom: 4.5
        //     }
        //     setPlace(data)
        // }
        // if (document.querySelector('#navList li.active') !== null) {
        //     var activeMenuType = document.querySelector('#navList li.active').id;
        //     //console.log("-activeMenuType1111--", activeMenuType);
        //     // document.querySelector('#navList li.active').classList.remove('active');
        // }
        //   setListingType(initialState);
        // setListingType({ list: false, image: false, map: false });
        //console.log("-activeMenuType2222--", activeMenuType);

        if (listingType.list) {
            setIsList(p => !p)
            setIsMap(p => !p)
        }
        else if (listingType.image)
            setIsImage(p => !p)
        else if (listingType.map) {
            setIsList(p => !p)
            setIsMap(p => !p)

        }
        //setListingType({ list: true, image: false, map: false });
    }

    // const activeItem = (id) => {
    //     if (document.querySelector('#navList li.active') !== null) {
    //         document.querySelector('#navList li.active').classList.remove('active');
    //     }
    //     document.getElementById(id).classList.add('active');
    // }

    const handlesearchFields = (e) => {
        //setSearchFields({...searchFields, searchText:e.target.value});      
        let priceMin = valuePrice[0];
        let priceMax = valuePrice[1];
        const { name, value } = e.target;
        // console.log("--name--", name);
        // console.log("--value--", value);
        if (name == 'priceFrom')
            setValue([value, priceMax]);
        else if (name == 'priceTo')
            setValue([priceMin, value]);
        else if (name == 'squareFeetMin' || name == 'squareFeetMax') {
            if (value != '') {
                const propertyNames = Object.keys(SquareFeetArray);
                let selectedIndex = propertyNames.indexOf(value);
                if (name == 'squareFeetMin')
                    var sliced = Object.fromEntries(Object.entries(SquareFeetArray).slice(selectedIndex + 1));
                else if (name == 'squareFeetMax')
                    var sliced = Object.fromEntries(Object.entries(SquareFeetArray).slice(0, selectedIndex));
            } else {
                var sliced = SquareFeetArray;
            }
            if (name == 'squareFeetMin') {
                setfilterPropArr({ ...filterPropArr, SquareFeetArrMax: sliced })
                document.getElementById('squareFeetMax').selectedIndex = '';
            } else if (name == 'squareFeetMax') {
                setfilterPropArr({ ...filterPropArr, SquareFeetArrMin: sliced })
                //document.getElementById('squareFeetMin').selectedIndex = '';
            }
        } else if (name == 'lotSizeMin' || name == 'lotSizeMax') {
            if (value != '') {
                const propertyNames = Object.keys(LotSizeArray);
                let selectedIndex = propertyNames.indexOf(value);
                if (name == 'lotSizeMin')
                    var sliced = Object.fromEntries(Object.entries(LotSizeArray).slice(selectedIndex + 1));
                else if (name == 'lotSizeMax')
                    var sliced = Object.fromEntries(Object.entries(LotSizeArray).slice(0, selectedIndex));
            } else {
                var sliced = LotSizeArray;
            }
            if (name == 'lotSizeMin') {
                setfilterPropArr({ ...filterPropArr, LotSizeArrMax: sliced })
                document.getElementById('lotSizeMax').selectedIndex = '';
            } else if (name == 'lotSizeMax') {
                setfilterPropArr({ ...filterPropArr, LotSizeArrMin: sliced })
                //document.getElementById('lotSizeMin').selectedIndex = '';
            }
        } else if (name == 'storiesMin' || name == 'storiesMax') {
            if (value != '') {
                const propertyNames = Object.keys(StoriesArray);
                let selectedIndex = propertyNames.indexOf(value);
                if (name == 'storiesMin')
                    var sliced = Object.fromEntries(Object.entries(StoriesArray).slice(selectedIndex + 1));
                else if (name == 'storiesMax')
                    var sliced = Object.fromEntries(Object.entries(StoriesArray).slice(0, selectedIndex));
            } else {
                var sliced = StoriesArray;
            }
            if (name == 'storiesMin') {
                setfilterPropArr({ ...filterPropArr, StoriesArrMax: sliced })
                document.getElementById('storiesMax').selectedIndex = '';
            } else if (name == 'storiesMax') {
                setfilterPropArr({ ...filterPropArr, StoriesArrMin: sliced })
                //document.getElementById('storiesMin').selectedIndex = '';
            }
        } else if (name == 'priceSqMin' || name == 'priceSqMax') {
            if (value != '') {
                const propertyNames = Object.keys(SquareFeetArray);
                let selectedIndex = propertyNames.indexOf(value);
                if (name == 'priceSqMin')
                    var sliced = Object.fromEntries(Object.entries(SquareFeetArray).slice(selectedIndex + 1));
                else if (name == 'priceSqMax')
                    var sliced = Object.fromEntries(Object.entries(SquareFeetArray).slice(0, selectedIndex));
            } else {
                var sliced = SquareFeetArray;
            }
            if (name == 'priceSqMin') {
                setfilterPropArr({ ...filterPropArr, PriceSquareFeetArrMax: sliced })
                document.getElementById('priceSqMax').selectedIndex = '';
            } else if (name == 'priceSqMax') {
                setfilterPropArr({ ...filterPropArr, PriceSquareFeetArrMin: sliced })
                //document.getElementById('priceSqMin').selectedIndex = '';
            }
        } else
            setSearchFields({ ...searchFields, [name]: value });
    }

    const priceRange = (child) => {
        setValue(child);
        //setValue([]);
    }

    const priceSearch = (e) => {
        console.log(price)
        dispatch(dashboardPrice(price))
        e.preventDefault();
        passPropsToChild();
        setFilterType(initialFilterState);
    }

    const bedroomsCheckbox = (event) => {
        var inputs = document.querySelectorAll('.bedrooms');
        for (var i = 0; i < inputs.length; i++) {
            let id = inputs[i].id;
            if (id != event.target.id)
                document.getElementById(id).checked = false;
        }
    }

    const bathroomsCheckbox = (event) => {
        //console.log("--eve--",event.target.id);
        var inputs = document.querySelectorAll('.bathrooms');
        for (var i = 0; i < inputs.length; i++) {
            let id = inputs[i].id;
            if (id != event.target.id)
                document.getElementById(id).checked = false;
        }
    }

    const bedbathSearch = (e) => {
        e.preventDefault();
        var checkedValueBed = '', checkedValueBath = '';
        var checkedBed = document.querySelectorAll('input[name="bed"]:checked');
        if (checkedBed.length > 0)
            checkedValueBed = document.querySelectorAll('input[name="bed"]:checked')[0].value;
        var checkedBath = document.querySelectorAll('input[name="bath"]:checked');
        if (checkedBath.length > 0)
            checkedValueBath = document.querySelectorAll('input[name="bath"]:checked')[0].value;
        passPropsToChild();
        setSearchFields({ ...searchFields, bed: checkedValueBed, bath: checkedValueBath })
        dispatch(dashboardRoom({ bed: checkedValueBed, bath: checkedValueBath }))
        setFilterType(initialFilterState);
    }
    const resetBedBathSearch = (e) => {
        e.preventDefault()
        setSearchFields({ ...searchFields, bed: '', bath: '' })
        dispatch(dashboardRoom({ bed: '', bath: '' }))
        passPropsToChild();
        isListShow()
    }
    const hometypeCheckbox = async (e) => {
        //alert("hometype");
        e.preventDefault();
        var checkboxes = document.querySelectorAll('input[name="homeType"]:checked');
        let hometypeArr = [];
        let hometypeCheckedValue = '';
        // Loops through checkboxes
        if (checkboxes.length > 0) {
            for (const checkbox of checkboxes) {
                // Collects relevant text if checkbox is checked
                if (checkbox.checked) {
                    let hometypeValue = checkbox.value;
                    hometypeArr.push(hometypeValue);
                }
            }
            hometypeCheckedValue = hometypeArr.toString();
        }
        passPropsToChild();
        setSearchFields({ ...searchFields, homeTypeString: hometypeCheckedValue })
        dispatch(dashboardHomeType(hometypeCheckedValue))
        setFilterType(initialFilterState);
    }

    const resetHometypeCheckbox=(e)=>{
        e.preventDefault()
        setSearchFields({...searchFields,homeTypeString:""})
        dispatch(dashboardHomeType(""))
        passPropsToChild();
        isListShow()
    }

    const applyFilter = (e) => {
        e.preventDefault();
        console.log('hi')
        var checkboxes = document.querySelectorAll('input[name="amenities"]:checked');
        let amenitiesArr = [];
        let amenitiesCheckedValue = '';
        if (checkboxes.length > 0) {
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    let amenitiesValue = checkbox.value;
                    amenitiesArr.push(amenitiesValue);
                }
            }
            amenitiesCheckedValue = amenitiesArr.toString();
        }

        var checkboxes = document.querySelectorAll('input[name="houseView"]:checked');
        let houseViewArr = [];
        let houseViewCheckedValue = '';
        if (checkboxes.length > 0) {
            for (const checkbox of checkboxes) {
                if (checkbox.checked) {
                    let houseViewValue = checkbox.value;
                    houseViewArr.push(houseViewValue);
                }
            }
            houseViewCheckedValue = houseViewArr.toString();
        }

        var storiesMinVal = document.getElementById("storiesMin").value;
        //var storiesMinVal = e.options[e.selectedIndex].text;
        var storiesMaxVal = document.getElementById("storiesMax").value;
        var squareFeetMinVal = document.getElementById("squareFeetMin").value;
        var squareFeetMaxVal = document.getElementById("squareFeetMax").value;
        var lotSizeMinVal = document.getElementById("lotSizeMin").value;
        var lotSizeMaxVal = document.getElementById("lotSizeMax").value;
        var costFinanceVal = document.getElementById("costFinance").value;
        var yearBuildMinVal = document.getElementById("yearBuildMin").value;
        var yearBuildMaxVal = document.getElementById("yearBuildMax").value;
        // var walkScoreVal = document.getElementById("walkScore").value;
        // var bikeScoreVal = document.getElementById("bikeScore").value;
        var priceSqMinVal = document.getElementById("priceSqMin").value;
        var priceSqMaxVal = document.getElementById("priceSqMax").value;
        // var poolTypeVal = document.getElementById("poolType").value;
        passPropsToChild();
        // setSearchFields({ ...searchFields, pricesquareFeetMin: priceSqMinVal, pricesquareFeetMax: priceSqMaxVal, poolType: poolTypeVal, walkScore: walkScoreVal, bikeScore: bikeScoreVal, yearBuildMin: yearBuildMinVal, yearBuildMax: yearBuildMaxVal, costFinance: costFinanceVal, lotSizeMin: lotSizeMinVal, lotSizeMax: lotSizeMaxVal, squareFeetMin: squareFeetMinVal, squareFeetMax: squareFeetMaxVal, amenitiesString: amenitiesCheckedValue, houseViewString: houseViewCheckedValue, storiesMin: storiesMinVal, storiesMax: storiesMaxVal })
        setSearchFields({ ...searchFields, pricesquareFeetMin: priceSqMinVal, pricesquareFeetMax: priceSqMaxVal, yearBuildMin: yearBuildMinVal, yearBuildMax: yearBuildMaxVal, costFinance: costFinanceVal, lotSizeMin: lotSizeMinVal, lotSizeMax: lotSizeMaxVal, squareFeetMin: squareFeetMinVal, squareFeetMax: squareFeetMaxVal, amenitiesString: amenitiesCheckedValue, houseViewString: houseViewCheckedValue, storiesMin: storiesMinVal, storiesMax: storiesMaxVal })
        dispatch(dashboardDetails({ pricesquareFeetMin: priceSqMinVal, pricesquareFeetMax: priceSqMaxVal, yearBuildMin: yearBuildMinVal, yearBuildMax: yearBuildMaxVal, costFinance: costFinanceVal, lotSizeMin: lotSizeMinVal, lotSizeMax: lotSizeMaxVal, squareFeetMin: squareFeetMinVal, squareFeetMax: squareFeetMaxVal, amenitiesString: amenitiesCheckedValue, houseViewString: houseViewCheckedValue, storiesMin: storiesMinVal, storiesMax: storiesMaxVal }))
        setFilterType(initialFilterState);
    }

    const resetAll = (e) => {
        // document.getElementById("apply-filter-form").reset();
        setSearchFields({
            ...searchFields,
            squareFeetMin: '',
            squareFeetMax: '',
            pricesquareFeetMin: '',
            pricesquareFeetMax: '',
            lotSizeMin: '',
            lotSizeMax: '',
            yearBuildMin: '',
            yearBuildMax: '',
            costFinance: '',
            // poolType: '',
            amenitiesString: '',
            houseViewString: '',
            storiesMin: '',
            storiesMax: '',
            // walkScore: '',
            // bikeScore: '',
        })
        document.getElementById('squareFeetMax').selectedIndex = '';
        document.getElementById('squareFeetMin').selectedIndex = '';
        document.getElementById('priceSqMin').selectedIndex = '';
        document.getElementById('priceSqMax').selectedIndex = '';
        document.getElementById('lotSizeMax').selectedIndex = '';
        document.getElementById('lotSizeMin').selectedIndex = '';
        document.getElementById('storiesMax').selectedIndex = '';
        document.getElementById('storiesMin').selectedIndex = '';
        document.getElementById('costFinance').selectedIndex = '';
        document.getElementById('yearBuildMax').value = null;
        document.getElementById('yearBuildMin').value = null;


        // document.getElementById('poolType').selectedIndex = '';
        // document.getElementById('walkScore').selectedIndex = '';
        // document.getElementById('bikeScore').selectedIndex = '';
    }
    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk',
        onPlaceSelected: (places) => {
            console.log("condition", places)
            if (places.geometry !== undefined) {
                let data = {
                    lat: places.geometry.location.lat(),
                    lng: places.geometry.location.lng(),
                    zoom: 13
                }
                dispatch(dashboardGoogleSearch(data))
                setPlace(data)
            }
            else {
                dispatch(dashboardGoogleSearch({ lat: null, lng: null, zoom: null }))
            }
            if (places.formatted_address !== undefined) {
                dispatch(dashboardSearch({ name: places.formatted_address.split(',')[0], displayName: places.formatted_address }))
                setSearchFields({ ...searchFields, searchText: places.formatted_address.split(',')[0], searchDisplay: places.formatted_address })
                let datas = {
                    name: places.formatted_address.split(',')[0],
                    displayName: places.formatted_address
                }
            }
            console.log('listing', listingType)
            // setSearchFields({ ...searchFields, searchDisplay: ref.current.value })
            // setSearchFields({ ...searchFields, searchText: ref.current.value.split(',')[0] })
            // setSearchFields({ ...searchFields, searchDisplay: places.formatted_address })

            passPropsToChild();

        },
        options: {
            types: ["(regions)"],
            componentRestrictions: { country: "us" },
        },
    });
    const [data, setData] = useState([]);

    const minData = [
        { displayminimumprice: "0+", minprice: 0 },
        { displayminimumprice: "100,000+", minprice: 100000 },
        { displayminimumprice: "200,000+", minprice: 200000 },
        { displayminimumprice: "300,000+", minprice: 300000 },
        { displayminimumprice: "400,000+", minprice: 400000 },
        { displayminimumprice: "500,000+", minprice: 500000 },
        { displayminimumprice: "600,000+", minprice: 600000 },
        { displayminimumprice: "700,000+", minprice: 700000 },
        { displayminimumprice: "800,000+", minprice: 800000 },
        { displayminimumprice: "900,000+", minprice: 900000 },
        { displayminimumprice: "1M+", minprice: 1000000 },
        { displayminimumprice: "1.25M", minprice: 1250000 },
        { displayminimumprice: "1.5M", minprice: 1500000 },
        { displayminimumprice: "1.75M", minprice: 1750000 },
        { displayminimumprice: "2M", minprice: 2000000 },
        { displayminimumprice: "2.25M", minprice: 2250000 },
        { displayminimumprice: "2.5M", minprice: 2500000 },
        { displayminimumprice: "2.75M", minprice: 2750000 },
        { displayminimumprice: "3M", minprice: 3000000 },
        { displayminimumprice: "4M", minprice: 4000000 },
        { displayminimumprice: "5M", minprice: 5000000 },
        { displayminimumprice: "6M", minprice: 6000000 },
        { displayminimumprice: "7M", minprice: 7000000 },
        { displayminimumprice: "8M", minprice: 8000000 },
        { displayminimumprice: "9M", minprice: 9000000 },
        { displayminimumprice: "10M", minprice: 10000000 },
    ]
    const maxData = [
        { displaymaximumprice: '100,000', maxprice: 100000 },
        { displaymaximumprice: '200,000', maxprice: 200000 },
        { displaymaximumprice: '300,000', maxprice: 300000 },
        { displaymaximumprice: '400,000', maxprice: 400000 },
        { displaymaximumprice: '500,000', maxprice: 500000 },
        { displaymaximumprice: '600,000', maxprice: 600000 },
        { displaymaximumprice: '700,000', maxprice: 700000 },
        { displaymaximumprice: '800,000', maxprice: 800000 },
        { displaymaximumprice: '900,000', maxprice: 900000 },
        { displaymaximumprice: '1M', maxprice: 1000000 },
        { displaymaximumprice: '1.25M', maxprice: 1250000 },
        { displaymaximumprice: '1.5M', maxprice: 1500000 },
        { displayminimumprice: "1.75M", maxprice: 1750000 },
        { displayminimumprice: "2M", maxprice: 2000000 },
        { displayminimumprice: "2.25M", maxprice: 2250000 },
        { displayminimumprice: "2.5M", maxprice: 2500000 },
        { displayminimumprice: "2.75M", maxprice: 2750000 },
        { displayminimumprice: "3M", maxprice: 3000000 },
        { displayminimumprice: "4M", maxprice: 4000000 },
        { displayminimumprice: "5M", maxprice: 5000000 },
        { displayminimumprice: "6M", maxprice: 6000000 },
        { displayminimumprice: "7M", maxprice: 7000000 },
        { displayminimumprice: "8M", maxprice: 8000000 },
        { displayminimumprice: "9M", maxprice: 9000000 },
        { displayminimumprice: "10M", maxprice: 10000000 },

    ]
    const [minPrice, setMinPrice] = useState(minData)
    const [maxPrice, setMaxPrice] = useState(maxData)
    const [open, setOpen] = useState(false)
    const [priceList, setPriceList] = useState('min')
    const showDetail = () => {
        setOpen(true)
    }
    const [isopen, setIsOpen] = useState(false)
    const showDetails = () => {
        setIsOpen(true)
    }

    const handleMinPrice = (number, value, display) => {
        if (value === 'min') {
            setPrice({ ...price, min: number, displayMin: display })
            let data = [...maxData]
            let value = data.filter((element) => element.maxprice > number)
            setMaxPrice(value)
        }
        else if (value === 'max') {
            setPrice({ ...price, max: number, displayMax: display })
            let data = [...minData]
            let value = data.filter((element) => element.minprice < number)
            setMinPrice(value)
        }
    }
    // const handleMaxPrice=(number)=>{
    // }
    const hanldePriceReset = (e) => {
        dispatch(dashboardPrice({ min: null, max: null }))
        e.preventDefault()
        priceShow()
        setIsOpen(false)
        setPrice({ min: null, max: null })
        passPropsToChild()
    }
    const handleMap = () => {
        console.log('map', listingType)
        dispatch(dashboardPage({ map: true, list: false, image: false }))
        setListingType({ ...listingType, map: true, list: false, image: false })
    }
    const handleList = () => {
        console.log('list', listingType)
        dispatch(dashboardPage({ map: false, list: true, image: false }))
        setListingType({ ...listingType, map: false, list: true, image: false })
    }

    const hanldeBedsBathReset = (e) => {
        e.preventDefault();
     
       
    }

    return (
        <div>
            <Navbar isLogin={storage} />
            <Seo title="Dashboard" />
            {loader ? <Loader /> : null}
            <div className='deva'>
                <div className='row filter-items m-0'>
                    <div className='col-lg-12 col-xl-12 col-md-12' >
                        <div className='col-lg-4 col-xl-4 col-md-4 list-rightborder list-search list-filter-type'>
                            <form>
                                <input ref={ref} type="text" className={`col-lg-7 col-xl-7 col-md-7 search-list`} placeholder='Search...' value={searchFields.searchDisplay} onChange={(e) => setSearchFields({ ...searchFields, searchDisplay: e.target.value })} onKeyDown={handleKeyDown} />
                                <div className="searchIcon" >
                                    <img src={searchIcon} alt="Icon feather-search.png" className='search-icon-img' onClick={handlesearchSubmit} />
                                </div>
                            </form>
                        </div>
                        <div className='col-lg-2 col-xl-2 col-md-2  list-rightborder list-filter-type' style={{ position: "relative" }} >
                            <div className="list-menu-pointer" onClick={priceShow}>Price <span className='down-arrow'><FontAwesomeIcon icon={faAngleDown} size="1x" /></span></div>
                            {filterType.price ?
                                <div className='col-lg-3 col-xl-3 col-md-3 m-0' id="price-range">
                                    <Typography id="range-slider" gutterBottom className='form-field-label'>
                                        Price Range ($)
                                    </Typography>
                                    <form>
                                        <div className='row'>
                                            <div className='col-lg-6 col-xl-6 col-md-6'>
                                                <input value={price.displayMin} placeholder="Min" onClick={() => { showDetail(); setPriceList('min') }} name="priceFrom" className="form-field form-field-team mb-2" onChange={(e) => setPrice({ min: e.target.value })} />
                                            </div>
                                            <div className='col-lg-6 col-xl-6 col-md-6'>
                                                <input value={price.displayMax} placeholder="Max" onClick={() => { showDetail(); setPriceList('max') }} name="priceTo" className="form-field form-field-team mb-2" onChange={(e) => setPrice({ max: e.target.value })} />
                                            </div>
                                        </div>
                                        {/*06-04-2022 user1
                                            <Slider
                                            value={valuePrice}
                                            onChange={rangeSelector}
                                            valueLabelDisplay="auto"
                                            style={{ maxWidth: 410, color: "#0490fb" }}
                                            min={0}
                                            max={200000000}
                                            color="#0490fb"
                                            aria-labelledby="range-slider"
                                            className={classes.root}
                                        /> */}
                                        <div>
                                            {/* {data.map((item, index) =>
                                                <div key={index}>
                                                    {open && priceList==="min" ? (
                                                        <p value={valuePrice}  onChange={rangeSelector} onClick={()=>handleMinPrice(item.minprice)}>${item.displayminimumprice}</p>
                                                    ) : null}
                                                    {isopen && priceList==="max"? (
                                                        <p className='maximumprice'  onChange={rangeSelector}  value={valuePrice} onClick={()=>handleMaxPrice(item.maxprice)}>${item.displaymaximumprice}</p>
                                                    ) : null}
                                                </div>
                                            )} */}
                                            {minPrice.map((item, index) =>
                                                <div key={index} onClick={() => handleMinPrice(item.minprice, 'min', item.displayminimumprice)}>
                                                    {open && priceList === 'min' && index<10 &&
                                                        <p className='DejaVuSansCondensed f-14 cursor-pointer'>{item.displayminimumprice}</p>
                                                    }
                                                </div>
                                            )}
                                            {maxPrice.map((item, index) =>
                                                <div key={index} onClick={() => handleMinPrice(item.maxprice, 'max', item.displaymaximumprice)}>
                                                    {open && priceList === 'max' && index<10 &&
                                                        <p className='maximumprice DejaVuSansCondensed f-14 cursor-pointer'>{item.displaymaximumprice}</p>
                                                    }
                                                </div>
                                            )}

                                        </div>
                                        {/* <div className='donebtn'>
                                            <div className='row price-range-btn'>
                                                <Button type='submit' className='pricerange-submit-btn' onClick={priceSearch}>Update</Button>
                                            </div>
                                            <div className='row price-range-btn'>
                                                <p type='submit' className='pricerange-submit-btn' onClick={priceSearch}>Reset</p>
                                            </div>
                                        </div> */}
                                        <div className='py-3 d-flex justify-content-end donebtn'>
                                            <button className='btn mr-3 text-primary f-14' onClick={hanldePriceReset}>Reset</button>
                                            <button className='btn primaryColor f-14' onClick={priceSearch}>Update</button>
                                        </div>
                                    </form>
                                </div>
                                : null}
                        </div>
                        <div className=' col-lg-2 col-xl-2 col-md-2  list-rightborder list-filter-type' style={{ position: "relative" }}>
                            <div className="list-menu-pointer" onClick={bedBathShow}>Beds & Baths <span className='down-arrow'><FontAwesomeIcon icon={faAngleDown} size="1x" /></span></div>
                            {filterType.bedBath ?
                                <div className='col-lg-12 col-xl-12 col-md-12 m-0' id="bed-bath">
                                    <form>
                                        <div className=''>
                                            <p htmlFor="bed-room" className="form-label form-field-label bed-room">Bedrooms</p>
                                            <div className='bed-checkbox' id="bed-checkbox">
                                                <ul>
                                                    <li><input type="checkbox" name="bed" id="bed1" className="bedbath-chechbox form-check-input bedrooms" value="1" onClick={bedroomsCheckbox} defaultChecked={searchFields.bed == 1 ? true : false} /><div className='checkbox-plus'>1+</div></li>
                                                    <li><input type="checkbox" name="bed" id="bed2" className="bedbath-chechbox form-check-input bedrooms" value="2" onClick={bedroomsCheckbox} defaultChecked={searchFields.bed == 2 ? true : false} /><div className='checkbox-plus'>2+</div></li>
                                                    <li><input type="checkbox" name="bed" id="bed3" className="bedbath-chechbox form-check-input bedrooms" value="3" onClick={bedroomsCheckbox} defaultChecked={searchFields.bed == 3 ? true : false} /><div className='checkbox-plus'>3+</div></li>
                                                    <li><input type="checkbox" name="bed" id="bed4" className="bedbath-chechbox form-check-input bedrooms" value="4" onClick={bedroomsCheckbox} defaultChecked={searchFields.bed == 4 ? true : false} /><div className='checkbox-plus'>4+</div></li>
                                                    <li><input type="checkbox" name="bed" id="bed5" className="bedbath-chechbox form-check-input bedrooms" value="5" onClick={bedroomsCheckbox} defaultChecked={searchFields.bed == 5 ? true : false} /><div className='checkbox-plus'>5+</div></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p htmlFor="bath-room" className="form-label form-field-label bath-room">Bathrooms</p>
                                            <div className='bath-checkbox'>
                                                <ul>
                                                    <li><input type="checkbox" name="bath" id="bath1" className="bedbath-chechbox form-check-input bathrooms" value="1" onClick={bathroomsCheckbox} defaultChecked={searchFields.bath == 1 ? true : false} /><div className='checkbox-plus'>1+</div></li>
                                                    <li><input type="checkbox" name="bath" id="bath2" className="bedbath-chechbox form-check-input bathrooms" value="2" onClick={bathroomsCheckbox} defaultChecked={searchFields.bath == 2 ? true : false} /><div className='checkbox-plus'>2+</div></li>
                                                    <li><input type="checkbox" name="bath" id="bath3" className="bedbath-chechbox form-check-input bathrooms" value="3" onClick={bathroomsCheckbox} defaultChecked={searchFields.bath == 3 ? true : false} /><div className='checkbox-plus'>3+</div></li>
                                                    <li><input type="checkbox" name="bath" id="bath4" className="bedbath-chechbox form-check-input bathrooms" value="4" onClick={bathroomsCheckbox} defaultChecked={searchFields.bath == 4 ? true : false} /><div className='checkbox-plus'>4+</div></li>
                                                    <li><input type="checkbox" name="bath" id="bath5" className="bedbath-chechbox form-check-input bathrooms" value="5" onClick={bathroomsCheckbox} defaultChecked={searchFields.bath == 5 ? true : false} /><div className='checkbox-plus'>5+</div></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='donebtn'>
                                            <div className='d-flex bedbath-btn'>
                                                <button type='submit' className='btn mr-3 text-primary f-14' onClick={resetBedBathSearch}>Reset</button>
                                                <Button type='submit' className='bedbath-submit-btn' onClick={bedbathSearch}>Done</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                : null}
                        </div>
                        <div className='col-lg-2 col-xl-2 col-md-2  list-rightborder list-filter-type' style={{ position: "relative" }}>
                            <div className="list-menu-pointer" onClick={homeTypeShow}>Home Type <span className='down-arrow'><FontAwesomeIcon icon={faAngleDown} size="1x" /></span></div>
                            {filterType.homeType ?
                                <div className='col-lg-12 col-xl-12 col-md-12 m-0' id="home-type">
                                    <p htmlFor="home-type" className="form-label form-field-label home-type">Hometype</p>
                                    <form>
                                        <div className='row' id="hometype-checkbox">
                                            <div className='col-lg-6 col-xl-6 col-md-6' >
                                                <div className='home-type'>
                                                    <ul>
                                                        <li><input type="checkbox" name="homeType" id="home" value="home" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\bhome\b/) >= 0 ? true : false} />Home</li>
                                                        <li><input type="checkbox" name="homeType" id="condo" value="condo" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\bcondo\b/) >= 0 ? true : false} />Condo</li>
                                                        <li><input type="checkbox" name="homeType" id="multiFamily" value="multi_family" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\bmulti_family\b/) >= 0 ? true : false} />Multi Family</li>
                                                        <li><input type="checkbox" name="homeType" id="apartments" value="apartments" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\bapartments\b/) >= 0 ? true : false} />Apartments</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-xl-6 col-md-6'>
                                                <div className='home-type'>
                                                    <ul>
                                                        <li><input type="checkbox" name="homeType" id="townHome" value="town_home" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\btown_home\b/) >= 0 ? true : false} />Townhome</li>
                                                        <li><input type="checkbox" name="homeType" id="lotsLand" value="lots_land" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\blots_land\b/) >= 0 ? true : false} />Lots / Land</li>
                                                        <li><input type="checkbox" name="homeType" id="manufactured" value="manufactured" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\bmanufactured\b/) >= 0 ? true : false} />Manufactured</li>
                                                        <li><input type="checkbox" name="homeType" id="others" value="other" className="bedbath-chechbox form-check-input homeType" defaultChecked={searchFields.homeTypeString.search(/\bother\b/) >= 0 ? true : false} />Others</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='donebtn'>
                                            <div className='d-flex bedbath-btn'>
                                                <button type='submit' className='btn mr-3 text-primary f-14' onClick={resetHometypeCheckbox}>Reset</button>
                                                <Button type='submit' className='bedbath-submit-btn' onClick={hometypeCheckbox} >Done</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                : null}
                        </div>
                        <div className='col-lg-2 col-xl-2 col-md-2 list-filter-type' style={{ position: "relative" }}>
                            <div className="list-menu-pointer filter-more" onClick={moreFilterShow}>More Filters <span className='down-arrow'><FontAwesomeIcon icon={faAngleDown} size="1x" /></span></div>
                            {filterType.moreFilter ?
                                <div className='col-lg-12 col-xl-12 col-md-12 m-0' id="more-filter">
                                    <div id="apply-filter-form">
                                        <div className='row mb-4'>
                                            <p className="form-label form-field-label form-field-morefilter ">Property Details</p>
                                            <div className='col-lg-6 col-xl-6 col-md-6 pr-25'>
                                                <div className='row mb-3'>
                                                    <p className="form-label form-field-label form-field-morefilter inner-title">Square Feet</p>
                                                    <div className='col-lg-6 col-xl-6 col-md-6'>
                                                        <select id="squareFeetMin" name="squareFeetMin" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.squareFeetMin} onChange={(e) => handlesearchFields(e)}>
                                                            <option value="">--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.SquareFeetArrMin).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data} data-index={index + 1}>{filterPropArr.SquareFeetArrMin[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-lg-6 col-xl-6 col-md-6 ps-0'>
                                                        <select id="squareFeetMax" name="squareFeetMax" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.squareFeetMax} onChange={(e) => handlesearchFields(e)}>
                                                            <option value="">--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.SquareFeetArrMax).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data} data-index={index + 1}>{filterPropArr.SquareFeetArrMax[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <p className="form-label form-field-label form-field-morefilter inner-title">Year Built</p>
                                                    <div className='col-lg-6 col-xl-6 col-md-6'>
                                                        <input type="number" id="yearBuildMin" name="yearBuildMin" placeholder='Min' className="form-field mb-2 company-select year-input" maxLength="4" defaultValue={searchFields.yearBuildMin} />
                                                        {/* <select name="squareFeetMin" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--">
                                                            <option selected value="">--Select--</option>
                                                            <option selected value="min">Min</option>
                                                        </select> */}
                                                    </div>
                                                    <div className='col-lg-6 col-xl-6 col-md-6 ps-0'>
                                                        <input type="number" id="yearBuildMax" name="yearBuildMax" placeholder='Max' className="form-field mb-2 company-select year-input" maxLength="4" defaultValue={searchFields.yearBuildMax} />
                                                        {/* <select name="squareFeetMax" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--">
                                                            <option selected value="">--Select--</option>
                                                            <option selected value="max">Max</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-xl-6 col-md-6 pl-25'>
                                                <p className="form-label form-field-label form-field-morefilter ms-1  inner-title">Lot Size</p>
                                                <div className='row mb-3'>
                                                    <div className='col-lg-6 col-xl-6 col-md-6'>
                                                        <select id="lotSizeMin" name="lotSizeMin" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.lotSizeMin} onChange={(e) => handlesearchFields(e)}>
                                                            <option value="">--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.LotSizeArrMin).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data}>{filterPropArr.LotSizeArrMin[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-lg-6 col-xl-6 col-md-6 ps-0'>
                                                        <select id="lotSizeMax" name="lotSizeMax" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.lotSizeMax} onChange={(e) => handlesearchFields(e)}>
                                                            <option value="">--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.LotSizeArrMax).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data}>{filterPropArr.LotSizeArrMax[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-4'>
                                            <p className="form-label form-field-label  form-field-morefilter">Cost / Finance</p>
                                            <div className='col-lg-6 col-xl-6 col-md-6 pr-25'>
                                                <p className="form-label form-field-label form-field-morefilter ms-1 inner-title">HOA Fees</p>
                                                <div className=''>
                                                    <select id="costFinance" name="costFinance" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.costFinance} >
                                                        <option value="">--Select--</option>
                                                        {
                                                            Object.keys(HOAFees).map((data, index) => {
                                                                return (
                                                                    <option key={index} value={data}>{HOAFees[data]}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 col-xl-6 col-md-6 pl-25'>
                                                <p className="form-label form-field-label form-field-morefilter ms-1 inner-title">Price / Sq.Ft</p>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-xl-6 col-md-6'>
                                                        <select id="priceSqMin" name="priceSqMin" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.pricesquareFeetMin} onChange={(e) => handlesearchFields(e)}>
                                                            <option value="">--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.PriceSquareFeetArrMin).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data} data-index={index + 1}>{filterPropArr.PriceSquareFeetArrMin[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-lg-6 col-xl-6 col-md-6 ps-0'>
                                                        <select id="priceSqMax" name="priceSqMax" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.pricesquareFeetMax} onChange={(e) => handlesearchFields(e)}>
                                                            <option value="">--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.PriceSquareFeetArrMax).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data} data-index={index + 1}>{filterPropArr.PriceSquareFeetArrMax[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row mb-3'>
                                            <p className="form-label form-field-label  form-field-morefilter">Amenities</p>
                                            <div className='col-lg-6 col-xl-6 col-md-6 pr-25'>
                                                <p className="form-label form-field-label  form-field-morefilter ms-1 inner-title">Stories</p>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-xl-6 col-md-6'>
                                                        <select id="storiesMin" name="storiesMin" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.storiesMin} onChange={(e) => handlesearchFields(e)}>
                                                            <option value='' >--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.StoriesArrMin).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data}>{filterPropArr.StoriesArrMin[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col-lg-6 col-xl-6 col-md-6 ps-0'>
                                                        <select id="storiesMax" name="storiesMax" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.storiesMax} onChange={(e) => handlesearchFields(e)}>
                                                            <option value='' >--Select--</option>
                                                            {
                                                                Object.keys(filterPropArr.StoriesArrMax).map((data, index) => {
                                                                    return (
                                                                        <option key={index} value={data}>{filterPropArr.StoriesArrMax[data]}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* 05-04-2022 <div className='col-lg-6 col-xl-6 col-md-6 pl-25'>
                                                <p className="form-label form-field-label  form-field-morefilter ms-1 inner-title">Pool Type</p>
                                                <div>
                                                    <select id="poolType" name="poolType" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--" defaultValue={searchFields.poolType}>
                                                        <option value=''>--Select--</option>
                                                        {
                                                            Object.keys(PoolTypeArray).map((data, index) => {
                                                                return (
                                                                    <option key={index} value={data}>{PoolTypeArray[data]}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* 30-05-22 <div className='row mb-4'>
                                            <div className='col-lg-4 col-xl-4 col-md-4'>
                                                <div className='more-filter-checkbox'>
                                                    <ul>
                                                        <li><input type="checkbox" name="amenities" value="balcony" id="Balcony" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bbalcony\b/) >= 0 ? true : false} />Balcony</li>
                                                        <li><input type="checkbox" name="amenities" value="central_heating" id="CentralHeating" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bcentral_heating\b/) >= 0 ? true : false} />Central Heating</li>
                                                        <li><input type="checkbox" name="amenities" value="elevator" id="Elevator" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\belevator\b/) >= 0 ? true : false} />Elevator</li>
                                                        <li><input type="checkbox" name="amenities" value="pets_allowed" id="PetsAllowed" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bpets_allowed\b/) >= 0 ? true : false} />Pets Allowed</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-xl-4 col-md-4'>
                                                <div className='more-filter-checkbox'>
                                                    <ul>
                                                        <li><input type="checkbox" name="amenities" value="basement" id="Basement" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bbasement\b/) >= 0 ? true : false} />Basement</li>
                                                        <li><input type="checkbox" name="amenities" value="cleaning_services" id="CleaningServices" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bcleaning_services\b/) >= 0 ? true : false} />Cleaning Services</li>
                                                        <li><input type="checkbox" name="amenities" value="fireplace" id="Fireplace" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bfireplace\b/) >= 0 ? true : false} />Fireplace</li>
                                                        <li><input type="checkbox" name="amenities" value="spa" id="Spa" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bspa\b/) >= 0 ? true : false} />Spa</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-xl-4 col-md-4'>
                                                <div className='more-filter-checkbox'>
                                                    <ul>
                                                        <li><input type="checkbox" name="amenities" value="car_garage" id="CarGarage" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bcar_garage\b/) >= 0 ? true : false} />Car Garage</li>
                                                        <li><input type="checkbox" name="amenities" value="dishwasher" id="Dishwasher" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bdishwasher\b/) >= 0 ? true : false} />Dishwasher</li>
                                                        <li><input type="checkbox" name="amenities" value="parking" id="Parking" className="bedbath-chechbox form-check-input" defaultChecked={searchFields.amenitiesString.search(/\bparking\b/) >= 0 ? true : false} />Parking</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* 05-04-2022 <div className='row mb-4'>
                                            <p className="form-label form-field-label form-field-morefilter">House View</p>
                                            <div className='col-lg-4 col-xl-4 col-md-4'>
                                                <div className='more-filter-checkbox'>
                                                    <ul>
                                                        <li><input type="checkbox" name="houseView" value="city_view" id="CityView" className="bedbath-chechbox form-check-input houseView" defaultChecked={searchFields.houseViewString.search(/\bcity_view\b/) >= 0 ? true : false} />City View</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-xl-4 col-md-4'>
                                                <div className='more-filter-checkbox'>
                                                    <ul>
                                                        <li><input type="checkbox" name="houseView" value="park_view" id="ParkView" className="bedbath-chechbox form-check-input houseView" defaultChecked={searchFields.houseViewString.search(/\bpark_view\b/) >= 0 ? true : false} />Park View</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-xl-4 col-md-4'>
                                                <div className='more-filter-checkbox'>
                                                    <ul>
                                                        <li><input type="checkbox" name="houseView" value="mountain_view" id="MountainView" className="bedbath-chechbox form-check-input houseView" defaultChecked={searchFields.houseViewString.search(/\bmountain_view\b/) >= 0 ? true : false} />Mountain View</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className='row mb-4'>
                                            {/* 05-04-2022 <p className="form-label form-field-label form-field-morefilter">Score</p>
                                            <div className='col-lg-6 col-xl-6 col-md-6 pr-25'>
                                                <p className="form-label form-field-label form-field-morefilter ms-1 inner-title">Walk Score</p>
                                                <div>
                                                    <input type="number" id="walkScore" name="walkScore" className="form-field mb-2 company-select year-input" maxLength="100" defaultValue={searchFields.walkScore} />
                                                    {/* <select name="walkScore" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--">
                                                        <option>--Select--</option>
                                                        <option value="max">Max</option>
                                                    </select> */}
                                            {/* </div>
                                            </div> */}
                                            {/* <div className='col-lg-6 col-xl-6 col-md-6 pl-25'>
                                                <p className="form-label form-field-label form-field-morefilter ms-1 inner-title">Bike Score</p>
                                                <div>
                                                    <input type="number" id="bikeScore" name="bikeScore" className="form-field mb-2 company-select year-input" maxLength="100" defaultValue={searchFields.bikeScore} />
                                                    {/* <select name="bikeScore" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--">
                                                        <option>--Select--</option>
                                                        <option value="max">Max</option>
                                                    </select> */}
                                            {/* </div>
                                            </div> */}
                                        </div>
                                        <div className='row morefilter-btn'>
                                            <div className='col-lg-6 col-xl-6 col-md-6 morefilter-reset' onClick={resetAll}>Reset All</div>
                                            <div className='col-lg-6 col-xl-6 col-md-6 button-right'>
                                                <Button type='submit' className='morefilter-submit-btn' onClick={applyFilter}>Apply Filters</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
                <div onClick={isListShow}>
                    <div className='row pt-3 m-0'>
                        <div className='col-lg-12 col-xl-12 col-md-12'>
                            <ul className='list-type' >
                                <li onClick={handleMap} ><RiMapPinFill tyle={{ fill: '' }} size="25px" /></li>
                                <li className='active'><RiListUnordered style={{ fill: '' }} size="25px" /></li>
                                {/* <li id="map" ><RiMapPinFill tyle={{ fill: '' }} size="25px" onClick={() => { listClick(); mapView(); }} /></li>
                                <li id="list" className='active'><RiListUnordered style={{ fill: '' }} size="25px" onClick={listView} /></li> */}
                                {/* <li id="image" ><RiFileDamageLine style={{ fill: '' }} size="25px" onClick={imageView} /></li> */}
                            </ul>
                        </div>
                    </div>
                    {
                        listingType.map &&
                        <>
                            <div className='row pt-3 m-0 position-relative'>
                                <div className='col-lg-12 col-xl-12 col-md-12' style={{ position: "absolute", right: "29%", zIndex: 1, top: "-37px" }}>
                                    <ul className='list-type'>
                                        <li className='active'><RiMapPinFill tyle={{ fill: '' }} size="25px" /></li>
                                        <li onClick={handleList}><RiListUnordered style={{ fill: '' }} size="25px" /></li>
                                        {/* <li id="map" className='active'><RiMapPinFill tyle={{ fill: '' }} size="25px" onClick={mapView} /></li>
                                        <li id="list" ><RiListUnordered style={{ fill: '' }} size="25px" onClick={() => { back(); listView(); }} /></li> */}
                                        {/* <li id="image" ><RiFileDamageLine style={{ fill: '' }} size="25px" onClick={() => { back(); imageView(); }} /></li> */}
                                    </ul>
                                </div>
                            </div>
                        </>
                    }
                    {listingType.list ?
                        <DashboardListView
                            priceRange={priceRange}
                            search={searchFields.searchText}
                            priceValue={price}
                            bed={searchFields.bed}
                            bath={searchFields.bath}
                            homeType={searchFields.homeTypeString}
                            squareFeetMin={searchFields.squareFeetMin}
                            squareFeetMax={searchFields.squareFeetMax}
                            lotSizeMin={searchFields.lotSizeMin}
                            lotSizeMax={searchFields.lotSizeMax}
                            yearBuildMin={searchFields.yearBuildMin}
                            yearBuildMax={searchFields.yearBuildMax}
                            HOAFees={searchFields.costFinance}
                            amenities={searchFields.amenitiesString}
                            houseView={searchFields.houseViewString}
                            storiesMin={searchFields.storiesMin}
                            storiesMax={searchFields.storiesMax}
                            poolType={searchFields.poolType}
                            walkScore={searchFields.walkScore}
                            bikeScore={searchFields.bikeScore}
                            pricesqftMin={searchFields.pricesquareFeetMin}
                            pricesqftMax={searchFields.pricesquareFeetMax}
                            loading={isList}
                        />
                        : listingType.image ?
                            <DashboardImageView
                                priceRange={priceRange}
                                search={searchFields.searchText}
                                priceValue={price}
                                bed={searchFields.bed}
                                bath={searchFields.bath}
                                homeType={searchFields.homeTypeString}
                                squareFeetMin={searchFields.squareFeetMin}
                                squareFeetMax={searchFields.squareFeetMax}
                                lotSizeMin={searchFields.lotSizeMin}
                                lotSizeMax={searchFields.lotSizeMax}
                                yearBuildMin={searchFields.yearBuildMin}
                                yearBuildMax={searchFields.yearBuildMax}
                                HOAFees={searchFields.costFinance}
                                amenities={searchFields.amenitiesString}
                                houseView={searchFields.houseViewString}
                                storiesMin={searchFields.storiesMin}
                                storiesMax={searchFields.storiesMax}
                                poolType={searchFields.poolType}
                                walkScore={searchFields.walkScore}
                                bikeScore={searchFields.bikeScore}
                                pricesqftMin={searchFields.pricesquareFeetMin}
                                pricesqftMax={searchFields.pricesquareFeetMax}
                                loading={isImage}
                            />
                            : listingType.map ?
                                <DashboardMapView
                                    priceRange={priceRange}
                                    search={searchFields.searchText}
                                    priceValue={price}
                                    bed={searchFields.bed}
                                    bath={searchFields.bath}
                                    homeType={searchFields.homeTypeString}
                                    squareFeetMin={searchFields.squareFeetMin}
                                    squareFeetMax={searchFields.squareFeetMax}
                                    lotSizeMin={searchFields.lotSizeMin}
                                    lotSizeMax={searchFields.lotSizeMax}
                                    yearBuildMin={searchFields.yearBuildMin}
                                    yearBuildMax={searchFields.yearBuildMax}
                                    HOAFees={searchFields.costFinance}
                                    amenities={searchFields.amenitiesString}
                                    houseView={searchFields.houseViewString}
                                    storiesMin={searchFields.storiesMin}
                                    storiesMax={searchFields.storiesMax}
                                    poolType={searchFields.poolType}
                                    walkScore={searchFields.walkScore}
                                    bikeScore={searchFields.bikeScore}
                                    pricesqftMin={searchFields.pricesquareFeetMin}
                                    pricesqftMax={searchFields.pricesquareFeetMax}
                                    mapSearch={place}
                                    loading={isMap}
                                />
                                : null}
                </div>
                {!loader && <Footer isLogin={storage} />}
            </div>
        </div>
    )
}

export default React.memo(DashboardList);
