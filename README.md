# Custom CSS Checkboxes and Radio Buttons

Default checkboxes and radio buttons are quite ugly and their appearance can't be easily customized - at least it was the case in the past. Luckily, CSS3 offers a good solution - <a href="http://www.w3.org/TR/selectors/#checked" target="_blank">:checked</a> pseudo class.

##### Demo

Demo available <a href="http://milanbrankovic.com/custom-css-checkboxes/" target="_blank">here</a>

## The technique under the hood

####HTML

For this example I was using the following markup:

```
<div class="custom-inputs">
    <input type="checkbox" name="checkbox" value="value" id="checkme">
    <label for="checkme">
        <span class="check">
            <span class="ico ico-checkmark"></span>
        </span>
        <span class="text">Check Me</span>
    </label>
</div>
```

####CSS

##### Step 1
Hide all the original inputs with `visibility` property - not with `display: none`. In order for inputs to catch `click` event (i.e. become checked/unchecked) it is necessary to hide them using visibility property. If element is hidden through `display: none`, its clickable area is also removed from the page, which makes event triggering (clicking) impossible.

```html
input[type="checkbox"],
input[type="radio"] {
    top: 7px;
    left: 2px;
    margin: 0;
    z-index: 3;
    visibility: hidden;
    position: absolute;
}
```

##### Step 2
Target `label` with an adjacent selector `+`.

```scss
+ label {
    @extend %v-align;
    cursor: pointer;
    position: relative;
    @include user-select;
    @include transition(all .5s ease);
}
```

##### Step 3
Next step is to target a `.check` class and to be creative as much as possible since this class will appear instead of the default checkboxes and radio buttons. If we are going to use icon fonts we need to target appropriate class, in this case I used `.ico` class nested inside of `.check` class as well.

```scss
.check {
    z-index: 2;
    @extend %v-align;
    border: $base-border;
    margin: rem-calc(0 5 0 0);
    background: $dark-bg;
    box-shadow: 0 1px 0 rgba(#fff, .15), 0 0 3px rgba(#000, .4) inset;

    .ico {
        top: 3px;
        left: 2px;
        opacity: 0;
        position: absolute;
        color: $blue-color;
        font-size: rem-calc(18);
    }
}
```

##### Step 4
The final step and the most important is `:checked` pseudo class.

```scss
:checked {

    + label {

        .check {
            background: #38393b;
            box-shadow: 0 1px 0 rgba(#fff, .15), 0 0 3px rgba(#000, .7) inset;

            .ico {
                opacity: 1;
            }
        }
    }
}
```


##### Complete chunk of SASS/COMPASS code 

```scss
input[type="checkbox"],
input[type="radio"] {
    top: 7px;
    left: 2px;
    margin: 0;
    z-index: 3;
    visibility: hidden;
    position: absolute;

    + label {
        @extend %v-align;
        cursor: pointer;
        position: relative;
        @include user-select;
        @include transition(all .5s ease);

        * {
            @include transition(all .3s ease);
        }

        .check {
            z-index: 2;
            @extend %v-align;
            border: $base-border;
            margin: rem-calc(0 5 0 0);
            background: $dark-bg;
            box-shadow: 0 1px 0 rgba(#fff, .15), 0 0 3px rgba(#000, .4) inset;

            .ico {
                top: 3px;
                left: 2px;
                opacity: 0;
                position: absolute;
                color: $blue-color;
                font-size: rem-calc(18);
            }
        }
    }

    &:checked {

        + label {

            .check {
                background: #38393b;
                box-shadow: 0 1px 0 rgba(#fff, .15), 0 0 3px rgba(#000, .7) inset;

                .ico {
                    opacity: 1;
                }
            }
        }
    }
}
```

##### This works perfectly in latest versions of following browsers:
- Firefox
- Chrome 
- Safari 
- Android
- IE9, IE10, IE11

If you want to use the same styles as in the demo just use _checkboxes.scss file (sass/modules/_checkboxes.scss).

##### Demo

Demo available <a href="http://milanbrankovic.com/custom-css-checkboxes/" target="_blank">here</a>
