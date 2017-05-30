const fs=require('fs');
const ev=require('events');

class FileWatcher extends ev
{
    constructor(watchDir,processedDir)
    {
        super();
        this.watchDir=watchDir;
        this.processedDir=processedDir;
    }

    watchD()
    {
        fs.watchFile(this.watchDir,()=>{
            fs.readdir(this.watchDir,(err,files)=>{
                if(err)
                    console.error(err.errno+' '+err.message);
                else
                    {
                        for (let f of files)
                            this.emit('process', f);
                    }
            });
        });
    }
}

const fw=new FileWatcher('watched','processed');

fw.on('process',(file)=>{
    let watchFile = fw.watchDir + '/' + file;
    let processedFile = fw.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, (err)=>{
        if (err)
            console.error(err.errno+' '+err.message);
        else
            console.log(`${watchFile} moved to ${processedFile}`);
    });
});

fw.watchD();
