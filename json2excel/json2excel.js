const fs = require('fs');
const excel = require('exceljs');
// 需要读取的文件名
const fileName = 'data.json';

// 获取当前时间
var start_time = new Date();

console.log('开始读取文件....');
fs.readFile(fileName, (err, data)=> {
    if(err) throw err;
    console.log('读取文件完成,开始处理文件....');
    // 读取到文件，开始解析
    const res = JSON.parse(data.toString());
    console.log('处理文件完成，开始写入Excel....');
    // 创建excel
    const workbook = new excel.stream.xlsx.WorkbookWriter({
        filename: 'data.xlsx'
    })
    const worksheet = workbook.addWorksheet('Sheet1');
    
    let tmpColumn = [],         // 创建列标题
        length = res.length,    // 读取数据长度
        currentProgress = 0,    // 定义当前进度   
        time_monitor = 400,     // 时间监视器(如果在该时间内还没有写入Excel完成，则开始显示当前百分比进度)
        tmp_time = Date.now();  // 当前时间
    
    // 读取列标题
    Object.keys(res[0]).map(i => {
        tmpColumn.push({header: i, key: i});
    })
    worksheet.columns = tmpColumn;
    // 遍历res，写入Excel
    res.map( (item, index) => {
        worksheet.addRow(item).commit();
        currentProgress = index;
        if(Date.now() - tmp_time > time_monitor) {
            temp_time = Date.now();
            console.log((currentProgress / length * 100).toFixed(2) + '%');
        }
    })
    workbook.commit();
    console.log('写入Excel完成!');
    var end_time = new Date();

    console.log('用时： ' + (end_time - start_time) + 'ms');
});