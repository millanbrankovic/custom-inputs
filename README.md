# Custom CSS Checkboxes and Radio Buttons

Default checkboxes and radio buttons are a quite ugly and aren't friendly customizable - at least that was the case in the past. Luckily CSS3 offers a good solution - <a href="http://www.w3.org/TR/selectors/#checked" target="_blank">:checked</a> pseudo class.

## The technique under the hood

####HTML

For this examples I was using the following markup:

```
<input type="checkbox" name="checkbox" value="value" id="checkme">
<label for="checkme">
    <span class="check">
        <span class="ico ico-checkmark"></span>
    </span>
    <span class="text">Check Me</span>
</label>
```

####CSS

##### Step 1
Hide all the original inputs.

```
input[type="checkbox"],
input[type="radio"] {
    display: none;
}
```

##### Step 2
Target `label` with an adjacent selector `+`.

```
+ label {
    @extend %v-align;
    cursor: pointer;
    position: relative;
    user-select: none;
    @include user-select;
    @include transition(all .5s ease);
}
```

##### Step 3
Next step is to target a `.check` class and to be creative as much as we can since this class will appear instead of default checkboxes and radiobuttons. If we are going to use icon fonts we need to target appropriate class, in this case I was using an `.ico` class nested inside of `.check` class as well.

```
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

```
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
```

##### Step 5
Now it's up to you and your creativity.


##### Complete chunk of SASS/COMPASS code 

```
input[type="checkbox"],
input[type="radio"] {
    display: none;

    + label {
        @extend %v-align;
        cursor: pointer;
        position: relative;
        user-select: none;
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


##### Demo

Demo available <a href="http://milanbrankovic.com/custom-css-checkboxes/" target="_blank">here</a>
