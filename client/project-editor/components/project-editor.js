import React, {Component} from 'react';
/* Material UI */
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

/* Pollider */
import {formatDate} from '../../global.js';
import RowContainer from './row-container.js';
import ProjectDialog from './project-dialog.js';
import {ProjectView} from '../../project-view/';
import {PostIcon} from '../../post-container/';

import {
    MaterialButton,
    Seperator
} from '../../ui-components/';


import PostHeader from '../../../public/theme/default/post-header.js';

class ProjectEditor extends React.Component {

    constructor (props) {
        super(props);
        const {
            model
        } = this.props;

        this.state = {
            model,
            selected: null,
            displayFullPreview: false
        };
    }

    componentWillReceiveProps (nextProps) {
        console.log( 'save?', nextProps );
        this.setState({model: nextProps.model});
    }

    componentDidMount() {
        const {
            model
        } = this.state;

        if (model.rows.length < 1) {
            this.addRow(0);

            model.rows[0].cols[0].setElement({
                type: 'text',
                open: 'true'
            });

            // model.rows[0].cols[0].displayElement(true);

            this.setState({ model });

            // this.state.model.rows[0].cols[0].element.displayByType('text');
        }
    }

    addRow (colIndex, currentRow, position ) {
        const {
            model
        } = this.state;

        model.addRow({
            colIndex,
            selected: currentRow,
            position
        });

        this.setState({ model });
    }

    openDialog (data) {
        const dialogModel = {
            actions: data.actions,
            fields: data.fields,
            style: data.style,
            options: data.options
        };

        this.setState({
            isDialogOpen: true,
            dialogModel
        });
    }

    closeDialog () {

        this.setState({
            isDialogOpen: false
        });
    }

    handleDialogModel (data, model = {}) {
        const prevModel = {...prevModel};

        switch (data.type) {
            /* New Row */
            case 'new-row':
                this.openDialog({
                    options: {
                        submit: {
                            label: 'Login',
                            hidden: true
                        },
                        cancel: {
                            label: 'Cancel',
                        },
                        executeOnEnter: false
                    },
                    fields: [
                        {
                            title: 'New Row',
                            subtitle: {
                                pre: 'Select number of columns'
                            },
                            dataType: 'row-selector'
                        }
                    ],
                    actions: {
                        execute: (_data) => {
                            this.addRow(_data.colIndex);
                        }
                    },
                    style: {
                        dialog: {
                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50
                        },
                    }
                });
                break;

            /* Delete Row */
            case 'delete-row':
                this.openDialog({
                    fields: [
                        {
                            title: 'Delete',
                            subtitle: {
                                pre: 'Are you sure to delete?',
                            },
                            dataType: null
                        }
                    ],
                    actions: {
                        execute: () => {
                            model.deleteRow(data.model);
                        }
                    },
                    style: {
                        dialog: {
                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50
                        },
                    }
                });
            break;

            /* Up Row */
            case 'up-row':
                model.upRow(data.model);
                model.content    = data.content;
                model.contentRaw = data.contentRaw;

                this.setState({
                    preview: this.props.model

                });
            break;

            /* Down Row */
            case 'down-row':
                model.downRow(data.model);
                model.content    = data.content;
                model.contentRaw = data.contentRaw;

                this.setState({
                    preview: this.props.model

                });
            break;

            /* Duplicate */
            case 'duplicate-row':
                model.duplicate(data.model);
                model.content    = data.content;
                model.contentRaw = data.contentRaw;

                this.setState({

                    preview: this.props.model
                });

            break;

            /* Top Row */
            case 'row-to-top':

                model.topRow(data.model);
                model.content    = data.content;
                model.contentRaw = data.contentRaw;

                this.setState({

                    preview: this.props.model

                });

            break;

            /* Bottom Row */
            case 'row-to-bottom':

                model.bottomRow(data.model);
                model.content    = data.content;
                model.contentRaw = data.contentRaw;

                this.setState({
                    preview: this.props.model

                });

            break;


            /* Add Row Above */
            case 'add-row-above':

                alert();

                this.openDialog({

                    fields: [
                        {
                            title: 'Add Row Above',
                            subtitle: {
                                pre: 'Select number of columns',
                            },
                            dataType: 'row-selector'
                        }

                   ],

                    actions: {

                        execute: (_data) => {

                            this.addRow(_data.colIndex, data.model, 0);

                        }
                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        }

                    }

                });

            break;

            /* Add Row Below */
            case 'add-row-below':

                this.openDialog({

                    fields: [
                        {
                            title: 'Add Row Below',
                            subtitle: {
                                pre: 'Select number of columns',
                            },
                            dataType: 'row-selector'
                        }

                   ],

                    actions: {

                        execute: (_data) => {

                            this.addRow(_data.colIndex, data.model, 1);

                        }

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        }

                    }

                });

            break;

            case 'resize-image':

                this.openDialog({

                    fields: [
                        {
                            title: 'Resize Image',
                            dataType: 'slider',
                            default: data.default
                        }

                   ],
                    actions: {

                        execute: (_data) => {

                            model.setPadding(_data);

                            this.setState({

                                preview: this.props.model

                            });

                        },

                        update: (_data) => {

                            model.setPadding(_data);

                            this.setState({

                                preview: this.props.model

                            });

                        },

                        cancel: () => {

                            model.padding = prevModel.padding;

                            this.setState({

                                preview: this.props.model

                            });

                        }

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        }

                    }

                });



            break;

            case 'text-editor':

                this.openDialog({

                    fields: [
                        {
                            dataType: 'text-editor',
                            default: model.contentRaw,
                            content: model.content
                        }

                   ],
                    actions: {

                        execute: (_data) => {

                            model.content    = _data.content;
                            model.contentRaw = _data.contentRaw;

                        },

                        update: (_data) => {

                            model.content    = _data.content;
                            model.contentRaw = _data.contentRaw;

                            this.setState({

                                preview: this.props.model

                            });

                        },

                        cancel: () => {

                            model.content    = prevModel.content;
                            model.contentRaw = prevModel.contentRaw;

                            this.setState({

                                preview: this.props.model

                            });

                        }

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        },
                        content: {
                            width: '80%',
                            height: '80%'
                        },

                    }

                });

            break;

            case 'embed':

                this.openDialog({

                    fields: [
                        {
                            dataType: 'embed',
                            default: model.content,
                            content: model.content
                        }

                   ],
                    actions: {

                        execute: (_data) => {

                            if (_data) {

                                model.content    = _data.content;
                                model.contentRaw = _data.contentRaw;

                            }

                        },

                        update: (_data) => {

                            model.content    = _data.content;
                            model.contentRaw = _data.contentRaw;

                            this.setState({

                                preview: this.props.model

                            });

                        },

                        cancel: () => {

                            model.content    = prevModel.content;
                            model.contentRaw = prevModel.contentRaw;

                            this.setState({

                                preview: this.props.model

                            });

                        }

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        },
                        content: {
                            width: '80%',
                        },

                    }

                });

            break;

            case 'code-editor':

                this.openDialog({

                    fields: [
                        {
                            dataType: 'code-editor',
                            default: model.contentRaw,
                            content: model.content
                        }

                   ],
                    actions: {

                        execute: (_data) => {

                            model.content    = _data.content;
                            model.contentRaw = _data.contentRaw;

                        },

                        update: (_data) => {

                            model.content    = _data.content;
                            model.contentRaw = _data.contentRaw;

                            this.setState({

                                preview: this.props.model

                            });

                        },

                        cancel: () => {

                            model.content    = prevModel.content;
                            model.contentRaw = prevModel.contentRaw;

                            this.setState({

                                preview: this.props.model

                            });

                        }

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        },
                        content: {
                            width: '80%',
                            height: '80%'
                        },

                    }

                });

            break;

            case 'post-container':

                this.openDialog({

                    fields: [

                        {
                            dataType: 'post-container',
                            postTypes: this.props.postTypes.postTypes,
                            selected: model.contentRaw ? model.contentRaw.id: null,
                            post_type_id: model.contentRaw ? model.contentRaw.post_type_id: null

                        }

                   ],
                    actions: {

                        execute: (_data) => {

                            model.content    = _data;
                            model.contentRaw = {
                                post_type_id: _data.post_type_id,
                                id    : _data.id,
                                type  : _data.hide.dataType
                            };


                        },

                        update:  (_data) => {

                            model.content    = _data;
                            model.contentRaw = {
                                post_type_id: _data.post_type_id,
                                id: _data.id,
                                type: _data.hide.dataType
                            };


                            this.setState({

                                preview: this.props.model

                            });

                        },

                        cancel:  (_data) => {

                            model.content    = prevModel.content;

                            this.setState({

                                preview: this.props.model

                            });

                        },

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        },
                        content: {

                            width: '95%'

                        },

                    }

                });

            break;

            case 'delete-element':
                this.openDialog({

                    fields: [

                        {
                            title: 'Delete',
                            subtitle: {
                                pre: 'Are you sure to delete?',
                            },
                            dataType: 'delete-element',
                            postTypes: this.props.uploads

                        }

                   ],
                    actions: {

                        execute: (_data) => {

                            model.element = null;

                            this.setState({

                                preview: this.props.model

                            });

                        }

                    },

                    style: {

                        dialog: {

                            width: '50%',
                            height: 'calc(100% - 50px)',
                            top: 50

                        }

                    }

                });

            break;


        }

        this.setState({

            actionMenuOpen: false

        });

    }


    setSelected (row, position) {

        this.setState({

            selected: row,
            position: position

        });

    }



    handleActionMenuOpen (event) {

        this.setState({

            actionMenuOpen: true,
            actionMenuAnchorEl: event.currentTarget

        });

    }

    handleActionMenuClose () {

        this.setState({

            actionMenuOpen: false

        });

    }

    render () {


        return (

            <div className = 'row' style = {{ height: '100%' }}>
                <div id = "project-editor" className = {"col-sm-" + (this.state.displayFullPreview ? 1: 6)} style = {{ display: this.state.displayFullPreview ? 'none': ''  }} >
                    <div
                        style = {{
                            width: '100%',
                            height: 56,
                            background: 'white',
                            borderBottom: '1px solid rgb(220,220,220)',
                            paddingRight: 10,
                            paddingLeft: 10
                        }}
                    >
                        <PostIcon
                            model = { this.props.post }
                            style = {{
                                width: 35,
                                height: 35,
                                marginTop: 10.5
                            }}
                        />
                        <span
                            style = {{
                                display: 'inline-block',
                                marginTop: 10.5,
                                marginLeft: 7.5
                            }}
                        >

                            <span className = { 'file-name' } style = {{ paddingLeft: 5 }}>{ this.props.post.name }</span>
                            <span className = { 'file-date' } style = {{ paddingLeft: 5 }}>{ formatDate(this.props.post.created_date) }</span>
                        </span>


                        <MaterialButton
                            style = {{
                                marginTop: 11,
                                float: 'right',
                            }}

                            onClick = { this.handleActionMenuOpen.bind(this) }
                            icon = { 'more_horiz'}
                            iconStyle = {{
                                color: 'rgb(60,60,60)'
                            }}

                        />

                        <Seperator
                            style = {{
                                marginTop: 18
                            }}
                        />


                        <MaterialButton
                            style      = {{
                                float: 'right',
                                margin: '9.5px 9.5px 0 0',
                                float: 'right',
                                boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.1)'
                            }}
                            hoverStyle = {{
                                color: 'white'
                            }}

                            onClick = {() => {
                                this.handleDialogModel({type: 'new-row'});
                            }}
                            label = { `New Row` }

                        />

                        <Popover
                          open           = { this.state.actionMenuOpen }
                          anchorEl       = { this.state.actionMenuAnchorEl }
                          anchorOrigin   = {{ horizontal: 'right', vertical: 'bottom' }}
                          targetOrigin   = {{ horizontal: 'right', vertical: 'top' }}
                          onRequestClose = { this.handleActionMenuClose.bind(this) }
                        >
                            <Menu
                                onChange = {(event, value) => {

                                    this.handleDialogModel(value);

                                }}
                                style = {{
                                    float: 'right'
                                }}
                                menuItemStyle = {{
                                    fontSize: 14
                                }}
                            >
                                <MenuItem value = {{ type: 'new-row' }}  primaryText="New Row" />

                                <Divider/>
                                <MenuItem value = {{ type: 1 }} primaryText="Reset" />

                            </Menu>
                        </Popover>
                        {
                            // <Seperator
                            //     style = {{
                            //         marginTop: 19
                            //     }}
                            // />
                        }
                    </div>

                    <div style = {{ height: 'calc(100% - 56px)', paddingBottom: 56 }}>

                        <RowContainer
                            top          = { true }
                            model        = { this.state.model }
                            display      = { this.props.display }
                            rowClassName = { 'parent-row' }
                            uploads      = { this.props.uploads }
                            handleDialogModel =  { this.handleDialogModel.bind(this) }
                            openDialog = { this.openDialog.bind(this) }
                        />
                    </div>


                </div>

                <div
                    id = 'pollider-public'
                    className = {"col-sm-" + (this.state.displayFullPreview ? 12: 6) }
                    style = {{
                        height: 'calc(100% - 47px)',
                        padding: '56px 2.5% 56px 2.5%',
                        overflow: 'scroll',
                    }}
                >
                    <PostHeader
                        model = {{...this.state.model.model, ...this.props.user}}
                        display = { true }
                    />
                    <div
                        style = {{
                            marginTop: 20
                        }}
                    >
                        <ProjectView
                            editor = { true }
                            model = { this.state.model }
                            style = {{
                                minHeight: 750
                            }}
                        />
                    </div>

                </div>
                <ProjectDialog
                    model = {this.state.dialogModel}
                    isOpen = {this.state.isDialogOpen ? true: false}
                    onRequestClose = {this.closeDialog.bind(this)}
                />

            </div>

       );

    }

}

export default ProjectEditor;
