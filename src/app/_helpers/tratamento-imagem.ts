export class TratamentoImagem {

   public imagemString:string;

    getFiles(event) {
    const arquivo = event.target.files;
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(arquivo[0]);
    }
   
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.imagemString = btoa(binaryString);  // Converting binary string data.
        
   }
}