document.addEventListener("DOMContentLoaded", function(){

(function(){
    var letters = "QWEĘRTYUIOÓPASŚDFGHJKLŁZŻXŹCĆVBNM";
    var sentences = [];
    sentences.push("BEZ PRACY NIE MA KOŁACZY");
    sentences.push("NIE MA RÓŻY BEZ KOLCÓW");
    sentences.push("FORTUNA KOŁEM SIĘ TOCZY");
    sentences.push("CHŁOPCY Z FERAJNY");
    sentences.push("TARGOWISKO PRÓŻNOŚCI");
    sentences.push("GDZIE DWÓCH SIĘ BIJE TAM TRZECI KORZYSTA");
    sentences.push("ZŁY MIKOŁAJ");
    sentences.push("NIE PŁACZ KIEDY ODJADĘ");
    sentences.push("WRÓBELEK ELEMELEK");
    sentences.push("NIGDY NIE MÓW NIGDY");
    sentences.push("NIECH ŻYJE BAL");
    sentences.push("SIAŁA BABA MAK NIE WIEDZIAŁA JAK");
    sentences.push("ZAPOMNIAŁ WÓŁ JAK CIELĘCIEM BYŁ");
    sentences.push("KRWAWY SPORT");
    sentences.push("NIE DOKAZUJ MIŁA NIE DOKAZUJ");
    sentences.push("OLIWA ZAWSZE SPRAWIEDLIWA");
    sentences.push("NIE MÓW HOP ZANMIM NIE PODSKOCZYSZ");
    
    var yes = new Audio("yes.wav");
    var no = new Audio("no.wav");
    
    var sentence = randomSentence();
    console.log(sentence);
    var sentenceCovered = "";
    var length = sentence.length;
    var count = 0;
    
    function randomSentence(){
        var number =  Math.floor(Math.random() * sentences.length);
        return sentences[number];
        
    }
    
    function showSentence(){
        for (var i = 0 ; i < length; i++){
           if (sentence.charAt(i) == " "){
               sentenceCovered += " ";
           }else{
               sentenceCovered += "-";
           }
        }
        $("#sentence").html(sentenceCovered);
    }
    
    function processSentence(letterId){
        $("#sentence").html("");
        var before = sentenceCovered.substr(0, letterId);
        var after = sentenceCovered.substr(letterId+1);
        sentenceCovered = before + sentence.charAt(letterId) + after;
        $("#sentence").html(sentenceCovered);
    }
    
    function showAlphabet(){
        var element = document.getElementById("alphabet");
        for (var i = 0 ; i < letters.length; i++){
            var blockId = "let" + i;
            $(element).append("<div class='text-center letter' id="+blockId+">"+letters.charAt(i)+"</div>");
            $("#"+blockId).on("click",{id:i}, letterClick);
        }  
    }
    
    function letterClick(event){
        var letterId = event.data.id;
        var found = false;
        for (var i = 0 ; i < length; i++){
           if (sentence.charAt(i) == letters.charAt(letterId)){
                    processSentence(i);
                    found = true;
           }
        }
        
        if (found == true){
            $(event.target).css("background-color","green");
            yes.play();
        } else{
            count++;
            $("#hangmen").html("<img src='img/s"+count+".jpg'/>");
            $(event.target).css("background-color","red");
            no.play();
            }
            
        if (count > 8){
                setTimeout(function(){
                    if (confirm("Niestety przegrałeś. Prawidłowe haslo to: "+sentence+"\nCzy chcesz zagrać jeszcze raz?")) location.reload();
                },500);
                } else if (sentence == sentenceCovered){
                setTimeout(function(){
                    if (confirm("BRAWO. Udalo Ci się odgadnać haslo.\nCzy chcesz zagrać jeszcze raz?")) location.reload();
                },500);
                }
        $(event.target).css("cursor","default");
        $(event.target).off("click");
    }
    
    showAlphabet();
    showSentence();
    
})();

})
