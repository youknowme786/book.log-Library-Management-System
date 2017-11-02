module.exports = function associateHasOne(child, parentArray) {
	parentArray.forEach(parent => {
		child.belongsTo(models.parent);
	});
};
