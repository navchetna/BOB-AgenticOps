from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas, security
from ..database import get_db

router = APIRouter(prefix="/forms", tags=["forms"])


@router.post("", response_model=schemas.SubmissionOut, status_code=201)
def create_submission(
    submission_in: schemas.SubmissionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    submission = models.Submission(**submission_in.model_dump(), owner_id=current_user.id)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("", response_model=list[schemas.SubmissionOut])
def list_submissions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user),
):
    return (
        db.query(models.Submission)
        .filter(models.Submission.owner_id == current_user.id)
        .order_by(models.Submission.created_at.desc())
        .all()
    )
