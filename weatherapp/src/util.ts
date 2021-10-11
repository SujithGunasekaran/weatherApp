import axios from 'axios';
import { weatherKey } from './config';

interface LatLngInfo {
    lat: number | string | undefined,
    lng: number | string | undefined
}

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getFullDate = (dateInput: number) => {
    let currentDate = new Date(dateInput * 1000);
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return `${date} ${months[month]} ${year}`;
}

export const getCurrentLocationByLatLng = async (latLngInfo: LatLngInfo) => {
    const { lat = null, lng = null } = latLngInfo
    if (lat && lng) {
        try {
            const locationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${weatherKey.key}`);
            if (!locationResponse || Object.keys(locationResponse.data).length === 0) throw new Error('Error while getting information, Please try again later');
            return locationResponse.data;
        }
        catch (err) {
            console.log(err);
        }
    }

}

export const getSevenDayLocationByLatLng = async (latLngInfo: LatLngInfo) => {
    console.log("lat", latLngInfo);
    const { lat = null, lng = null } = latLngInfo;
    if (lat && lng) {
        try {
            const locationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&type=hour&exclude=minutely,hourly&units=metric&appid=${weatherKey.key}`);
            if (!locationResponse || Object.keys(locationResponse.data).length === 0) throw new Error('Error while getting the information, Please try again later');
            else return locationResponse.data;
        }
        catch (err) {
            console.log(err);
        }
    }
}


export const getCurrentLocationByCity = async (cityName: string | undefined) => {
    if (cityName) {
        try {
            const locationResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey.key}`);
            if (!locationResponse || Object.keys(locationResponse.data).length === 0) throw new Error('Error while getting information, Please try again later');
            return locationResponse.data;
        }
        catch (err) {
            console.log(err);
        }
    }

}
