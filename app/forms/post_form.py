from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class PostForm(FlaskForm):
    #url StringFieldd andcaption
    url = StringField('url', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired()])
