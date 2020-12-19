class dogName {
    constructor() {

    }

    display() {
        var input = createInput("Name");
        var button = createButton('Play');

        input.position(130, 160);
        button.position(250, 200);

        button.mousePressed(function() {
            input.hide();
            button.hide();

            var name = input.value();

            dog.update(name)
        })
    }
}