export const formatOnEvents = (data) => {
    const uniqueIds = [];

    return data.map((paticipate) => (paticipate.event)).reduce((accumulator, current) => {

      if (!uniqueIds.includes(current._id)) {
        uniqueIds.push(current._id);
        accumulator.push(current); 
      }
      
      return accumulator;
    }, []);
}

export const formatOnCategory = (data) => {
    const uniqueIds = [];
    console.log(data);
    return data.map((paticipate) => (paticipate.category)).reduce((accumulator, current) => {

      if (!uniqueIds.includes(current._id)) {
        uniqueIds.push(current._id);
        accumulator.push(current); 
      }
      
      return accumulator;
    }, []);
}