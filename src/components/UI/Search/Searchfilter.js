
export default function searchfilter(searchText, tasks) {
    console.log(tasks)
    return tasks
        .filter(task => {
            if (task.title.toLowerCase().includes(searchText.toLowerCase())) {
                console.log(tasks)
                return true;
            }
            // if (task.description.includes(searchText)) {
            //     return true;
            // }
            return false;
        })
        .slice(0, 7);
        
}