
import Row          from './row';
import Element      from './Element.js';

class ProjectBase {

    constructor () {

        this.rows = [];
        this.index = 0;

    }

    deleteRow ( row ) {

        var _row;

        for ( var i = 0; i < this.rows.length; i++ ) {

            if ( this.rows[ i ].index == row.index ) {

                this.rows.splice( i, 1 );
                break;
            }

        }
    }

    upRow ( row ) {

        var _row;

        for ( var i = 0; i < this.rows.length; i++ ) {


            if ( this.rows[ i ].index == row.index ) {



                if ( this.rows[ i - 1 ] ) {

                    _row = this.rows[ i ];

                    this.rows[ i ] = this.rows[ i - 1 ];
                    this.rows[ i - 1 ] = _row;

                    break;

                } else {

                    // already most bottom

                }

                break;
            }

        }

    }

    downRow ( row ) {

        var _row;

        for ( var i = 0; i < this.rows.length; i++ ) {

            if ( this.rows[ i ].index == row.index ) {

                if ( this.rows[ i + 1 ] ) {

                    _row = this.rows[ i ];

                    this.rows[ i ] = this.rows[ i + 1 ];
                    this.rows[ i + 1 ] = _row;

                    break;

                } else {

                    // already most bottom

                }

                break;
            }

        }

    }

    duplicate ( row ) {

        var _row;

        for ( var i = 0; i < this.rows.length; i++ ) {

            if ( this.rows[ i ].index == row.index ) {

                    var duplicatedRow = new Row( this.index++ );

                    duplicatedRow.copy( row, false );

                    console.log( row, duplicatedRow );

                    this.rows.splice( i + 1 , 0, duplicatedRow  );

                break;

            }

        }


    }

    topRow ( row ) {

        var _row;

        for ( var i = 0; i < this.rows.length; i++ ) {

            if ( this.rows[ i ].index == row.index ) {

                var tempRows = [];

                _row = Object.assign( {}, this.rows[ i ] );

                this.rows.splice( i,1 );

                tempRows.push( _row );

                this.rows = tempRows.concat( this.rows );



                break;

            }

        }

    }

    bottomRow ( row ) {

        var _row;

        for ( var i = 0; i < this.rows.length; i++ ) {

            if ( this.rows[ i ].index == row.index ) {

                _row = Object.assign( {}, this.rows[ i ] );

                this.rows.splice( i,1 );

                this.rows.push( _row );

                break;

            }

        }

    }


    addRow ( data ) {

        if ( !data.selected ) {

            this.rows.push( new Row( this.index++, data.colIndex, data.dynamic ) );

        } else {

            var _row;

            for ( var i = 0; i < this.rows.length; i++ ) {

                if ( this.rows[ i ].index == data.selected.index ) {

                    this.rows.splice( i + data.position , 0, new Row( this.index++, data.colIndex, data.dynamic ) );

                    break;

                }

            }



        }

    }

}

class Col extends ProjectBase {

    constructor ( width, element ) {

        super( null );

        this.type  = '';
        this.width = width;
        this.rows  = [];

    }

    setElement ( type ) {

        this.element = new Element( type, '', '' );

    }

    copy ( col ) {

        this.type  = col.type;
        this.width = col.width;

        if ( col.element ) {

            this.element = new Element( col.element.type, col.element.content, col.element.contentRaw );

        }

        for ( let i = 0; i < col.rows.length; i++ ) {

            let newRow = new Row();

            newRow.copy( col.rows[ i ], true );

            this.rows[ i ] = newRow;

        }

    }

    html () {

        let html = '<div class="col-sm-' + this.width + '">';

        if ( this.element ) {

            html += this.element.content;

        } else {


            for ( let key in this.rows ) {

                html += this.rows[ key ].html();

            }

        }


        html += '</div>';

        return html;

    }

}

export default Col;
