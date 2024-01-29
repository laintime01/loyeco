import { useEffect, useState } from "react";
import { useGetDoctorQuery } from "../api/doctorApi";
import { getUserInfo } from '../../service/auth.service';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const [userId, setUserId] = useState('');
    const [isSkip, setIsSkip] = useState(true);
    const [data, setData] = useState({});
    const { data: doctorData, isError, isSuccess: dIsSuccess } = useGetDoctorQuery(userId, { skip: isSkip });

    useEffect(() => {
        const localAuth = getUserInfo();

        if (localAuth && localAuth !== null) {
            setUserId(localAuth?.userId)
            setIsSkip(false);
            setData(doctorData)
            setAuthChecked(dIsSuccess && !isError)
        }
    }, [doctorData, isError, dIsSuccess]);

    return {
        authChecked,
        data,
    };
}
